<script lang="ts">
	import type { Note } from '$lib/mutil/note';
	import KeyboardKey from './KeyboardKey.svelte';

	interface Props {
		row: Note[];
	}

	let { row }: Props = $props();
</script>

<div class="flex flex-row items-center">
	{#each row as note, idx (idx)}
		<KeyboardKey {note} />
	{/each}
</div>
