import axios from "axios";
import {
	instrumentClassToString,
	NoteName,
	notesOrdered,
	soundfontToString,
	type InstrumentClass,
	type SoundfontClass,
} from "./consts";
import { SvelteMap } from "svelte/reactivity";
import { Note } from "./note";

interface SoundfontBlob {
	note: NoteName;
	midi: number;
	blob: string;
}

export class Soundfont {
	loaded = $state(false);
	notes: Map<NoteName, Note> = new SvelteMap();

	private db?: IDBDatabase;
	private exists = true; // whether the soundfonts are already fetched and cached in indexed DB
	private objectStoreKey: string;
	private instrumentClass: InstrumentClass;
	private soundfontClass: SoundfontClass;

	constructor(
		instrumentClass: InstrumentClass,
		soundfontClass: SoundfontClass,
	) {
		this.instrumentClass = instrumentClass;
		this.soundfontClass = soundfontClass;
		this.objectStoreKey =
			"instrument" +
			"-" +
			instrumentClassToString(this.instrumentClass) +
			"-" +
			soundfontToString(this.soundfontClass);

		const req = window.indexedDB.open("mutil", 1);

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
			this.exists = false;
			const db = req.result;

			// object store already exits
			if (db.objectStoreNames.contains(this.objectStoreKey)) {
				db.deleteObjectStore(this.objectStoreKey);
			}

			const objectStore = db.createObjectStore(this.objectStoreKey, {
				keyPath: "id",
				autoIncrement: true,
			});
			objectStore.createIndex("note-idx", "note", {
				unique: true,
				multiEntry: false,
			});
			objectStore.createIndex("midi-idx", "midi", {
				unique: true,
				multiEntry: false,
			});
		};
	}

	async fetch() {
		// TODO: handle error
		if (!this.db) return;

		try {
			const blobs: SoundfontBlob[] = [];

			if (this.exists) {
				const transaction = this.db.transaction(
					this.objectStoreKey,
					"readonly",
				);
				const objectStore = transaction.objectStore(
					this.objectStoreKey,
				);

				const noteIdx = objectStore.index("note-idx");

				for (const note of notesOrdered) {
					const req = noteIdx.get(note);

					req.onerror = (event) => {
						console.log(event);
					};

					req.onsuccess = () => {
						if (req.result && req.result.blob) {
							const newNote = new Note(note, req.result.blob);
							this.notes.set(note, newNote);
						}
					};
				}
			} else {
				let midi = 1;

				for (const note of notesOrdered) {
					const req = await axios.get(
						`http://localhost:5173/instrument/piano/fluid/${note}.mp3`,
						{
							responseType: "blob",
						},
					);

					const item: SoundfontBlob = {
						note: note,
						midi: midi,
						blob: req.data,
					};

					blobs.push(item);

					const newNote = new Note(note, req.data);
					this.notes.set(note, newNote);
					midi++;
				}
			}

			const transaction = this.db.transaction(
				this.objectStoreKey,
				"readwrite",
			);
			const objectStore = transaction.objectStore(this.objectStoreKey);

			transaction.onerror = (event) => {
				console.log(event);
			};

			transaction.onabort = (event) => {
				console.log(event);
			};

			this.save(objectStore, blobs, () => {});
		} catch (err) {
			if (axios.isAxiosError(err)) {
				console.log(err);
			}
		}
	}

	load() {}

	play(name: NoteName) {
		this.notes.get(name)?.play();
	}

	private save(
		objectStore: IDBObjectStore,
		puts: SoundfontBlob[],
		callback: () => void,
	) {
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
