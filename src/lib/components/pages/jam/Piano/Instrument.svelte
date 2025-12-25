<script lang="ts">
	import { InstrumentClass, SoundfontClass } from '$lib/mutil/consts';
	import Keyboard from './Keyboard.svelte';
	import Piano from './Piano.svelte';
	import { Instrument } from '$lib/mutil/instrument';

	interface Props {
		type: 'piano' | 'keyboard';
	}

	let { type = $bindable('keyboard') }: Props = $props();

	const instrument = new Instrument(InstrumentClass.AcousticPiano, SoundfontClass.Fluid);

	$effect(() => {
		if (instrument.loaded) {
			instrument.fetch();
		}
	});
</script>

<div>
	{#if type === 'piano'}
		<Piano />
	{:else}
		<Keyboard rows={[[...instrument.notes.values()], []]} />
	{/if}
</div>
