<script lang="ts">
	import { Instrument, Note } from '$lib/mutil/index.svelte';
	import { InstrumentClass, NoteClass, Soundfont } from '$lib/mutil/consts';
	import Keyboard from './Keyboard.svelte';
	import Piano from './Piano.svelte';

	interface Props {
		type: 'piano' | 'keyboard';
	}

	let { type = $bindable('keyboard') }: Props = $props();

	const instrument = new Instrument(InstrumentClass.Piano, Soundfont.Fluid);

	let rowsTest: Note[][] = $state([]);

	$effect(() => {
		if (instrument.loaded) {
			instrument.fetch();
			rowsTest = [
				[
					new Note('FS1', NoteClass.FS, instrument),
					new Note('AS4', NoteClass.AS, instrument),
					new Note('B4', NoteClass.B, instrument)
				],
				[
					new Note('FS1', NoteClass.FS, instrument),
					new Note('AS4', NoteClass.AS, instrument),
					new Note('B4', NoteClass.B, instrument)
				]
			];
		}
	});
</script>

<div>
	{#if type === 'piano'}
		<Piano />
	{:else}
		<Keyboard rows={rowsTest} />
	{/if}
</div>
