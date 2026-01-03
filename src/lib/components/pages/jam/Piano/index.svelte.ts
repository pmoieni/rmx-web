import { notesOrdered } from "$lib/mutil/consts";
import { Note } from "$lib/mutil/note";
import type { Soundfont } from "$lib/mutil/soundfont";

export const qwertyKeys = [
	"a",
	"w",
	"s",
	"d",
	"r",
	"f",
	"t",
	"g",
	"h",
	"u",
	"j",
	"i",
	"k",
	"o",
	"l",
	";",
	"[",
	"'",
];

export interface NoteKey {
	key: string;
	note: Note;
}

export class Instrument {
	private soundfont: Soundfont;
	private notesArr: Note[];

	private segRange = $state([0, 17]);
	currSegment: Note[];

	constructor(soundfont: Soundfont) {
		this.soundfont = soundfont;
		this.notesArr = this.soundfont.notes.values().toArray();
		this.currSegment = $derived(
			this.notesArr.slice(this.segRange[0], this.segRange[1] + 1),
		);
	}

	notes(): Note[] {
		return this.notesArr;
	}

	moveOctave(dir: "up" | "down") {
		switch (dir) {
			case "up": {
				const len = this.notesArr.length;

				if (this.segRange[1] === len - 1) return;

				if (this.segRange[1] + 12 > len - 1) {
					this.segRange = [len - 18, len - 1];
					return;
				}

				this.segRange = [this.segRange[0] + 12, this.segRange[1] + 12];
				break;
			}
			case "down": {
				if (this.segRange[0] === 0) return;

				if (this.segRange[0] - 12 < 0) {
					this.segRange = [0, 17];
					return;
				}

				this.segRange = [this.segRange[0] - 12, this.segRange[1] - 12];
				break;
			}
		}
	}

	chunkNotesInto(chunkLengths: number[]): Note[][] {
		const chunks: Note[][] = [];

		let offset = 0;
		for (const len of chunkLengths) {
			const octave: Note[] = [];
			for (let i = 0; i < len; i++) {
				const note = this.soundfont.notes.get(notesOrdered[offset + i]);
				if (note) octave.push(note);
			}
			chunks.push(octave);
			offset += len;
		}

		return chunks;
	}
}
