import { notesOrdered } from "./consts";
import type { Note } from "./note";
import type { Soundfont } from "./soundfont";

// TODO: implement audio context
export class Instrument {
	private soundfont: Soundfont;

	constructor(soundfont: Soundfont) {
		this.soundfont = soundfont;
	}

	chunkNotesInto(octaveLengths: number[]): Note[][] {
		const octaves: Note[][] = [];
		let offset = 0;
		for (const len of octaveLengths) {
			const octave: Note[] = [];
			for (let i = 0; i < len; i++) {
				const note = this.soundfont.notes.get(notesOrdered[offset + i]);
				if (note) octave.push(note);
			}
			octaves.push(octave);
			offset += len;
		}

		return octaves;
	}
}
