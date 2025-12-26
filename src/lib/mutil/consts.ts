export enum InstrumentClass {
	AcousticPiano,
}

export function instrumentClassToString(instClass: InstrumentClass): string {
	switch (instClass) {
		case InstrumentClass.AcousticPiano:
			return "acoustic_piano";
	}
}

export enum NoteName {
	A0 = "A0",
	A1 = "A1",
	A2 = "A2",
	A3 = "A3",
	A4 = "A4",
	A5 = "A5",
	A6 = "A6",
	A7 = "A7",
	AS0 = "AS0",
	AS1 = "AS1",
	AS2 = "AS2",
	AS3 = "AS3",
	AS4 = "AS4",
	AS5 = "AS5",
	AS6 = "AS6",
	AS7 = "AS7",
	B0 = "B0",
	B1 = "B1",
	B2 = "B2",
	B3 = "B3",
	B4 = "B4",
	B5 = "B5",
	B6 = "B6",
	B7 = "B7",
	C1 = "C1",
	C2 = "C2",
	C3 = "C3",
	C4 = "C4",
	C5 = "C5",
	C6 = "C6",
	C7 = "C7",
	C8 = "C8",
	CS1 = "CS1",
	CS2 = "CS2",
	CS3 = "CS3",
	CS4 = "CS4",
	CS5 = "CS5",
	CS6 = "CS6",
	CS7 = "CS7",
	D1 = "D1",
	D2 = "D2",
	D3 = "D3",
	D4 = "D4",
	D5 = "D5",
	D6 = "D6",
	D7 = "D7",
	DS1 = "DS1",
	DS2 = "DS2",
	DS3 = "DS3",
	DS4 = "DS4",
	DS5 = "DS5",
	DS6 = "DS6",
	DS7 = "DS7",
	E1 = "E1",
	E2 = "E2",
	E3 = "E3",
	E4 = "E4",
	E5 = "E5",
	E6 = "E6",
	E7 = "E7",
	F1 = "F1",
	F2 = "F2",
	F3 = "F3",
	F4 = "F4",
	F5 = "F5",
	F6 = "F6",
	F7 = "F7",
	FS1 = "FS1",
	FS2 = "FS2",
	FS3 = "FS3",
	FS4 = "FS4",
	FS5 = "FS5",
	FS6 = "FS6",
	FS7 = "FS7",
	G1 = "G1",
	G2 = "G2",
	G3 = "G3",
	G4 = "G4",
	G5 = "G5",
	G6 = "G6",
	G7 = "G7",
	GS1 = "GS1",
	GS2 = "GS2",
	GS3 = "GS3",
	GS4 = "GS4",
	GS5 = "GS5",
	GS6 = "GS6",
	GS7 = "GS7",
}

export type NoteANatural =
	| NoteName.A0
	| NoteName.A1
	| NoteName.A2
	| NoteName.A3
	| NoteName.A4
	| NoteName.A5
	| NoteName.A6
	| NoteName.A7;
export type NoteASharp =
	| NoteName.AS0
	| NoteName.AS1
	| NoteName.AS2
	| NoteName.AS3
	| NoteName.AS4
	| NoteName.AS5
	| NoteName.AS6
	| NoteName.AS7;
export type NoteBNatural =
	| NoteName.B0
	| NoteName.B1
	| NoteName.B2
	| NoteName.B3
	| NoteName.B4
	| NoteName.B5
	| NoteName.B6
	| NoteName.B7;
export type NoteCNatural =
	| NoteName.C1
	| NoteName.C2
	| NoteName.C3
	| NoteName.C4
	| NoteName.C5
	| NoteName.C6
	| NoteName.C7
	| NoteName.C8;
export type NoteCSharp =
	| NoteName.CS1
	| NoteName.CS2
	| NoteName.CS3
	| NoteName.CS4
	| NoteName.CS5
	| NoteName.CS6
	| NoteName.CS7;
export type NoteDNatural =
	| NoteName.D1
	| NoteName.D2
	| NoteName.D3
	| NoteName.D4
	| NoteName.D5
	| NoteName.D6
	| NoteName.D7;
export type NoteDSharp =
	| NoteName.DS1
	| NoteName.DS2
	| NoteName.DS3
	| NoteName.DS4
	| NoteName.DS5
	| NoteName.DS6
	| NoteName.DS7;
export type NoteENatural =
	| NoteName.E1
	| NoteName.E2
	| NoteName.E3
	| NoteName.E4
	| NoteName.E5
	| NoteName.E6
	| NoteName.E7;
export type NoteFNatural =
	| NoteName.F1
	| NoteName.F2
	| NoteName.F3
	| NoteName.F4
	| NoteName.F5
	| NoteName.F6
	| NoteName.F7;
export type NoteFSharp =
	| NoteName.FS1
	| NoteName.FS2
	| NoteName.FS3
	| NoteName.FS4
	| NoteName.FS5
	| NoteName.FS6
	| NoteName.FS7;
export type NoteGNatural =
	| NoteName.G1
	| NoteName.G2
	| NoteName.G3
	| NoteName.G4
	| NoteName.G5
	| NoteName.G6
	| NoteName.G7;
export type NoteGSharp =
	| NoteName.GS1
	| NoteName.GS2
	| NoteName.GS3
	| NoteName.GS4
	| NoteName.GS5
	| NoteName.GS6
	| NoteName.GS7;

export type NoteClassA = NoteANatural | NoteASharp;
export type NoteClassB = NoteBNatural;
export type NoteClassC = NoteCNatural | NoteCSharp;
export type NoteClassD = NoteDNatural | NoteDSharp;
export type NoteClassE = NoteENatural;
export type NoteClassF = NoteFNatural | NoteFSharp;
export type NoteClassG = NoteGNatural | NoteGSharp;

export type NoteClass =
	| NoteClassA
	| NoteClassB
	| NoteClassC
	| NoteClassD
	| NoteClassE
	| NoteClassF
	| NoteClassG;

export function noteClassToString(note: NoteName): string {
	const noteClass = note.slice(0, -1);
	if (noteClass.length === 2) {
		return noteClass.substring(0, 1) + "#";
	}

	return noteClass;
}

export function noteClassToStringSolfege(note: NoteName): string {
	const noteClass = note.slice(0, -1);
	let noteName = noteClass.substring(0, 1);

	switch (noteName) {
		case "A":
			noteName = "La";
			break;
		case "B":
			noteName = "Ti";
			break;
		case "C":
			noteName = "Do";
			break;
		case "D":
			noteName = "Re";
			break;
		case "E":
			noteName = "Mi";
			break;
		case "F":
			noteName = "Fa";
			break;
		case "G":
			noteName = "Sol";
			break;
	}

	if (noteClass.length === 2) {
		return noteName + "#";
	}

	return noteName;
}

export enum SoundfontClass {
	Fluid,
}

export function soundfontToString(soundfontClass: SoundfontClass): string {
	switch (soundfontClass) {
		case SoundfontClass.Fluid:
			return "fluid";
	}
}
