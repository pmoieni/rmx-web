<script lang="ts">
	import { Button } from "bits-ui";
	import { qwertyKeys, type Instrument, type NoteKey } from "./index.svelte";

	interface Props {
		instrument: Instrument;
	}

	let { instrument }: Props = $props();

	const noteKeys = $derived.by<[NoteKey[], NoteKey[]]>(() => {
		const whites: NoteKey[] = [];
		const blacks: NoteKey[] = [];

		instrument.currSegment.forEach((note, idx) => {
			// TODO: find a better solution for detecting accent notes
			if (note.name.includes("S")) {
				blacks.push({ key: qwertyKeys[idx], note: note });
				return;
			}

			whites.push({ key: qwertyKeys[idx], note: note });
		});

		return [whites, blacks];
	});
</script>

<div class="flex flex-col items-center">
	<div class="flex flex-row items-center">
		{#each noteKeys[1] as noteKey (noteKey.note.name)}
			<Button.Root
				onclick={() => {
					noteKey.note.play();
				}}
				class="btn flex btn-square flex-col btn-neutral"
			>
				<div class="h-full w-full text-neutral-content">
					{noteKey.note.toString()}
				</div>
				<div class="w-full bg-primary text-primary-content">
					{noteKey.key}
				</div>
			</Button.Root>
		{/each}
	</div>
	<div class="flex flex-row items-center">
		{#each noteKeys[0] as noteKey (noteKey.note.name)}
			<Button.Root
				onclick={() => {
					noteKey.note.play();
				}}
				class="btn flex btn-square flex-col btn-neutral"
			>
				<div class="h-full w-full text-neutral-content">
					{noteKey.note.toString()}
				</div>
				<div class="w-full bg-primary text-primary-content">
					{noteKey.key}
				</div>
			</Button.Root>
		{/each}
	</div>
</div>
