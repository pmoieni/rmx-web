export enum InstrumentClass {
	Piano
}

export function instrumentClassToString(instClass: InstrumentClass): string {
	switch (instClass) {
		case InstrumentClass.Piano:
			return 'piano';
	}
}

export enum NoteClass {
	C,
	CS,
	D,
	DS,
	E,
	F,
	FS,
	G,
	GS,
	A,
	AS,
	B
}

export function noteClassToString(noteClass: NoteClass): string {
	switch (noteClass) {
		case NoteClass.C:
			return 'C';
		case NoteClass.CS:
			return 'CS';
		case NoteClass.D:
			return 'D';
		case NoteClass.DS:
			return 'DS';
		case NoteClass.E:
			return 'E';
		case NoteClass.F:
			return 'F';
		case NoteClass.FS:
			return 'FS';
		case NoteClass.G:
			return 'G';
		case NoteClass.GS:
			return 'GS';
		case NoteClass.A:
			return 'A';
		case NoteClass.AS:
			return 'AS';
		case NoteClass.B:
			return 'B';
	}
}

export function noteClassToStringSolfege(noteClass: NoteClass): string {
	switch (noteClass) {
		case NoteClass.C:
			return 'Do';
		case NoteClass.CS:
			return 'Do#';
		case NoteClass.D:
			return 'Re';
		case NoteClass.DS:
			return 'Re#';
		case NoteClass.E:
			return 'Mi';
		case NoteClass.F:
			return 'Fa';
		case NoteClass.FS:
			return 'Fa#';
		case NoteClass.G:
			return 'Sol';
		case NoteClass.GS:
			return 'Sol#';
		case NoteClass.A:
			return 'La';
		case NoteClass.AS:
			return 'La#';
		case NoteClass.B:
			return 'Ti';
	}
}

export enum Soundfont {
	Fluid
}

export function soundfontToString(soundfont: Soundfont): string {
	switch (soundfont) {
		case Soundfont.Fluid:
			return 'fluid';
	}
}

export const NotesList = [
	'A0',
	'A1',
	'A2',
	'A3',
	'A4',
	'A5',
	'A6',
	'A7',
	'AS0',
	'AS1',
	'AS2',
	'AS3',
	'AS4',
	'AS5',
	'AS6',
	'AS7',
	'B0',
	'B1',
	'B2',
	'B3',
	'B4',
	'B5',
	'B6',
	'B7',
	'C1',
	'C2',
	'C3',
	'C4',
	'C5',
	'C6',
	'C7',
	'C8',
	'CS1',
	'CS2',
	'CS3',
	'CS4',
	'CS5',
	'CS6',
	'CS7',
	'D1',
	'D2',
	'D3',
	'D4',
	'D5',
	'D6',
	'D7',
	'DS1',
	'DS2',
	'DS3',
	'DS4',
	'DS5',
	'DS6',
	'DS7',
	'E1',
	'E2',
	'E3',
	'E4',
	'E5',
	'E6',
	'E7',
	'F1',
	'F2',
	'F3',
	'F4',
	'F5',
	'F6',
	'F7',
	'FS1',
	'FS2',
	'FS3',
	'FS4',
	'FS5',
	'FS6',
	'FS7',
	'G1',
	'G2',
	'G3',
	'G4',
	'G5',
	'G6',
	'G7',
	'GS1',
	'GS2',
	'GS3',
	'GS4',
	'GS5',
	'GS6',
	'GS7'
];
