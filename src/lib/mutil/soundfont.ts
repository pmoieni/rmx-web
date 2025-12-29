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
	blob: Blob;
}

export class Soundfont {
	notes: Map<NoteName, Note> = new Map();
	private db: IndexedDB<SoundfontBlob>;

	private constructor(db: IndexedDB<SoundfontBlob>) {
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

		const db = new IndexedDB<SoundfontBlob>(objectStoreKey, 1, [
			"note",
			"midi",
		]);
		await db.connect();

		const soundfont = new Soundfont(db);
		await soundfont.load();

		return soundfont;
	}

	async load() {
		const blobs: SoundfontBlob[] = [];

		const count = await this.db.count();

		if (this.db.exists() && count > 0) {
			const dbResults = await this.db.getAll();

			for (const res of dbResults) {
				if (res.blob && res.note) {
					const newNote = new Note(res.note, res.blob);
					this.notes.set(res.note, newNote);
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
