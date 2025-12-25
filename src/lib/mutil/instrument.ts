import type { InstrumentClass, SoundfontClass } from './consts';
import { Soundfont } from './soundfont.svelte';

export class Instrument extends Soundfont {
	constructor(instrumentClass: InstrumentClass, soundfontClass: SoundfontClass) {
		super(instrumentClass, soundfontClass);
	}
}
