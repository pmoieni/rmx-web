<script lang="ts">
	import { InstrumentClass, SoundfontClass } from "$lib/mutil/consts";
	import Keyboard from "./Keyboard.svelte";
	import Piano from "./Piano.svelte";
	import { Instrument } from "$lib/mutil/instrument";
	import { Note } from "$lib/mutil/note";
	import { onMount } from "svelte";
	import { Soundfont } from "$lib/mutil/soundfont";

	interface Props {
		type: "piano" | "keyboard";
	}

	let { type = $bindable("keyboard") }: Props = $props();

	let instrument = $state<Instrument>();
	let octaves = $state<Note[][]>([]);

	onMount(async () => {
		const acousticPiano = await Soundfont.init(
			InstrumentClass.AcousticPiano,
			SoundfontClass.Fluid,
		);

		instrument = new Instrument(acousticPiano);
		octaves = instrument.chunkNotesInto([3, 12, 12, 12, 12, 12, 12, 12, 1]);
	});
</script>

<div>
	{#if type === "piano"}
		<Piano />
	{:else}
		<Keyboard rows={octaves} />
	{/if}
</div>
