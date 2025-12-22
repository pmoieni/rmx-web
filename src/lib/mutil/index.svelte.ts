import axios from 'axios';
import {
	InstrumentClass,
	instrumentClassToString,
	NoteClass,
	noteClassToString,
	noteClassToStringSolfege,
	NotesList,
	Soundfont,
	soundfontToString
} from './consts';

export class Note {
	name: string;
	class: NoteClass;
	instrument: Instrument;
	audioElement?: HTMLAudioElement;

	constructor(name: string, noteClass: NoteClass, inst: Instrument) {
		this.name = name;
		this.class = noteClass;
		this.instrument = inst;

		if (!inst.db) return;

		const req = inst.db
			.transaction(inst.objectStoreKey)
			.objectStore(inst.objectStoreKey)
			.get([name]);
		req.onsuccess = () => {
			console.log('get');
			console.log(req.result);
		};
	}

	play() {
		this.audioElement?.play();
	}

	revoke() {}

	toString(): string {
		return noteClassToString(this.class);
	}

	toStringSolfege(): string {
		return noteClassToStringSolfege(this.class);
	}
}

interface SoundfontBlob {
	note: string;
	blob: string;
}

export class Instrument {
	loaded = $state(false);

	db?: IDBDatabase;
	objectStoreKey: string;
	private class: InstrumentClass;
	private soundfont: Soundfont;

	constructor(instrument: InstrumentClass, soundfont: Soundfont) {
		this.class = instrument;
		this.soundfont = soundfont;
		this.objectStoreKey =
			'instrument' +
			'-' +
			instrumentClassToString(this.class) +
			'-' +
			soundfontToString(this.soundfont);

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
			objectStore.createIndex('note-idx', ['note'], { unique: true, multiEntry: false });
		};
	}

	async fetch() {
		// TODO: handle error
		if (!this.db) return;

		try {
			const blobs: SoundfontBlob[] = [];

			for (const note of NotesList) {
				const req = await axios.get(`http://localhost:5173/instrument/piano/fluid/${note}.mp3`, {
					responseType: 'blob'
				});

				const item: SoundfontBlob = {
					note: note,
					blob: req.data
				};

				blobs.push(item);
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

	async load() {
		try {
			const notes: Note[] = [];

			return notes;
		} catch (err) {
			console.log(err);
		}
	}
}
