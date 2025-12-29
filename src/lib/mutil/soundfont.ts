import axios from "axios";
import {
	instrumentClassToString,
	NoteName,
	notesOrdered,
	soundfontToString,
	type InstrumentClass,
	type SoundfontClass,
} from "./consts";
import { Note } from "./note";
import { IndexedDB } from "$lib/store/db";

interface SoundfontBlob {
	note: NoteName;
	midi: number;
	blob: string;
}

export class Soundfont {
	notes: Map<NoteName, Note> = new Map();
	private exists = true; // whether the soundfonts are already fetched and cached in indexed DB
	private db: IndexedDB;

	private constructor(db: IndexedDB) {
		this.db = db;
	}

	static async init(
		instrumentClass: InstrumentClass,
		soundfontClass: SoundfontClass,
	) {
		const objectStoreKey =
			"instrument" +
			"-" +
			instrumentClassToString(instrumentClass) +
			"-" +
			soundfontToString(soundfontClass);

		const db = new IndexedDB(objectStoreKey, 1, ["note", "midi"]);
		await db.connect();

		return new Soundfont(db);
	}

	async load() {
		// TODO: handle error
		if (!this.db) {
			console.log("db undefined");
			return;
		}

		const blobs: SoundfontBlob[] = [];

		if (this.exists) {
			const dbNotesReq = this.db.getByKey("note", notesOrdered);

			for (const req of dbNotesReq) {
				if (req.result && req.result.blob && req.result.note) {
					const newNote = new Note(req.result.note, req.result.blob);
					this.notes.set(req.result.note, newNote);
				}
			}
		} else {
			let midi = 1;

			for (const note of notesOrdered) {
				try {
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
				} catch (err) {
					if (axios.isAxiosError(err)) {
						console.log(err);
					}
				}
			}
		}

		this.db.save(blobs, () => {});
	}

	play(name: NoteName) {
		this.notes.get(name)?.play();
	}
}
