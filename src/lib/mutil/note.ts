import { noteClassToString, noteClassToStringSolfege, NoteName } from './consts';

export class Note {
	name: NoteName;
	private audioElement: HTMLAudioElement;

	constructor(name: NoteName, blob: Blob) {
		this.name = name;

		const blobURL = URL.createObjectURL(blob);
		this.audioElement = new Audio(blobURL);
	}

	play() {
		this.audioElement.play();
	}

	revoke() {}

	toString(): string {
		return noteClassToString(this.name);
	}

	toStringSolfege(): string {
		return noteClassToStringSolfege(this.name);
	}
}
