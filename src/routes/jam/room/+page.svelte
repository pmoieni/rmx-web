<script lang="ts">
	import ChatIcon from '$lib/assets/icons/ChatIcon.svelte';
	import MicrophoneIcon from '$lib/assets/icons/MicrophoneIcon.svelte';
	import MicrophoneSlashIcon from '$lib/assets/icons/MicrophoneSlashIcon.svelte';
	import MusicNoteIcon from '$lib/assets/icons/MusicNoteIcon.svelte';
	import Instrument from '$lib/components/pages/jam/Piano/Instrument.svelte';
	import { Button, Collapsible, Toggle } from 'bits-ui';
	import { fly } from 'svelte/transition';

	let micEnabled = $state(false);
	let midiEnabled = $state(false);
</script>

<main class="h-full w-full">
	<Collapsible.Root open={true} class="flex h-full w-full flex-row">
		<div class="content flex h-full w-full flex-col">
			<div class="player h-full w-full"><Instrument type="keyboard" /></div>
			<div class="toolbar flex w-full flex-row items-center justify-center gap-2 p-4">
				<Toggle.Root class="btn btn-circle btn-lg btn-primary" bind:pressed={midiEnabled}>
					<MusicNoteIcon />
				</Toggle.Root>
				<Toggle.Root class="btn btn-circle btn-lg btn-primary" bind:pressed={micEnabled}>
					{#if micEnabled}
						<MicrophoneIcon />
					{:else}
						<MicrophoneSlashIcon />
					{/if}
				</Toggle.Root>
				<Collapsible.Trigger class="btn btn-circle btn-lg btn-primary">
					<ChatIcon />
				</Collapsible.Trigger>
			</div>
		</div>
		<Collapsible.Content forceMount>
			{#snippet child({ props, open })}
				{#if open}
					<div {...props} transition:fly={{ x: 10 }} class="side h-full w-96 p-4">
						<div class="card chat flex h-full w-full flex-col gap-2 bg-base-200 p-2">
							<div class="messages h-full">messages</div>
							<textarea class="textarea w-full" placeholder="write your message here"></textarea>
							<Button.Root class="btn btn-primary">Send</Button.Root>
						</div>
					</div>
				{/if}
			{/snippet}
		</Collapsible.Content>
	</Collapsible.Root>
</main>
