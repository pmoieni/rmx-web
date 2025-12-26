<script lang="ts">
	import type { Note } from "$lib/mutil/note";
	import KeyboardRow from "./KeyboardRow.svelte";

	interface Props {
		rows: Note[][];
	}

	let { rows }: Props = $props();
</script>

<div class="flex flex-col items-center">
	{#each rows as row, idx (idx)}
		<KeyboardRow {row} />
	{/each}
</div>
