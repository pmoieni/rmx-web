<script lang="ts">
	import type { Note } from '$lib/mutil/note';
	import { Button } from 'bits-ui';

	interface Props {
		note: Note;
	}

	let { note }: Props = $props();

	function onclick() {
		note.play();
	}
</script>

<Button.Root {onclick} class="btn btn-square rounded-none btn-primary">
	{note.toString()}
</Button.Root>
