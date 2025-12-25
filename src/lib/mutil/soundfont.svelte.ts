import axios from 'axios';
import {
	instrumentClassToString,
	NoteName,
	soundfontToString,
	type InstrumentClass,
	type SoundfontClass
} from './consts';
import { SvelteMap } from 'svelte/reactivity';
import { Note } from './note';

interface SoundfontBlob {
	note: NoteName;
	blob: string;
}

export class Soundfont {
	loaded = $state(false);
	notes: Map<NoteName, Note> = new SvelteMap();

	private db?: IDBDatabase;
	private objectStoreKey: string;
	private instrumentClass: InstrumentClass;
	private soundfontClass: SoundfontClass;

	constructor(instrumentClass: InstrumentClass, soundfontClass: SoundfontClass) {
		this.instrumentClass = instrumentClass;
		this.soundfontClass = soundfontClass;
		this.objectStoreKey =
			'instrument' +
			'-' +
			instrumentClassToString(this.instrumentClass) +
			'-' +
			soundfontToString(this.soundfontClass);

		const req = window.indexedDB.open('mutil', 1);

		req.onerror = () => {
			console.log(req.error);
		};

		req.onsuccess = (/* event: Event */) => {
			// `dom` TS library doesn't provide enough type information for this instance so instead of
			// this: (event.target as IDBOpenDBRequest).result
			// we can just access the `result` directly from the request
			this.db = req.result;
			this.loaded = true;
		};

		req.onupgradeneeded = () => {
			const db = req.result;

			// object store already exits
			if (db.objectStoreNames.contains(this.objectStoreKey))
				db.deleteObjectStore(this.objectStoreKey);

			const objectStore = db.createObjectStore(this.objectStoreKey, {
				keyPath: 'id',
				autoIncrement: true
			});
			objectStore.createIndex('note-idx', 'note', { unique: true, multiEntry: false });
		};
	}

	async fetch() {
		// TODO: handle error
		if (!this.db) return;

		try {
			const blobs: SoundfontBlob[] = [];

			for (const note in NoteName) {
				const req = await axios.get(`http://localhost:5173/instrument/piano/fluid/${note}.mp3`, {
					responseType: 'blob'
				});

				const item: SoundfontBlob = {
					note: <NoteName>note, // enums are just strings
					blob: req.data
				};

				blobs.push(item);

				const newNote = new Note(<NoteName>note, req.data);
				this.notes.set(<NoteName>note, newNote);
			}

			const transaction = this.db.transaction(this.objectStoreKey, 'readwrite');
			const objectStore = transaction.objectStore(this.objectStoreKey);

			transaction.onerror = (event) => {
				console.log(event);
			};

			this.save(objectStore, blobs, () => {});
		} catch (err) {
			if (axios.isAxiosError(err)) {
				console.log(err);
			}
		}
	}

	play(name: NoteName) {
		this.notes.get(name)?.play();
	}

	private save(objectStore: IDBObjectStore, puts: SoundfontBlob[], callback: () => void) {
		let pendingRequests = 0;
		function dispatchRequest() {
			while (pendingRequests < 100 && puts.length !== 0) {
				const request = objectStore.put(puts.pop());
				request.onsuccess = () => {
					pendingRequests -= 1;
					dispatchRequest();
					callback();
				};
				pendingRequests += 1;
			}
		}
		dispatchRequest();
	}
}
