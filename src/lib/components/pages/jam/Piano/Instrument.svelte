<script lang="ts">
	import { InstrumentClass, SoundfontClass } from "$lib/mutil/consts";
	import Keyboard from "./Keyboard.svelte";
	import Piano from "./Piano.svelte";
	import { onMount } from "svelte";
	import { Soundfont } from "$lib/mutil/soundfont";
	import { Instrument } from "./index.svelte";

	interface Props {
		type: "piano" | "keyboard";
	}

	let { type = $bindable("keyboard") }: Props = $props();

	let instrument = $state<Instrument>();

	onMount(async () => {
		const acousticPiano = await Soundfont.init(
			InstrumentClass.AcousticPiano,
			SoundfontClass.Fluid,
		);

		instrument = new Instrument(acousticPiano);
	});
</script>

<div>
	{#if instrument}
		{#if type === "piano"}
			<Piano />
		{:else}
			<Keyboard {instrument} />
		{/if}
	{/if}
</div>
