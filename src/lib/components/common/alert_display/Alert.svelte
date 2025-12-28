<script lang="ts">
	import { Button } from "bits-ui";
	import type { Notif } from "./index.svelte";

	interface Props {
		notification: Notif;
	}

	let { notification }: Props = $props();
</script>

<div class={`pointer-events-auto card p-4 shadow-sm bg-${notification.level}`}>
	<div>
		<Button.Root onclick={() => notification.discard()}>discard</Button.Root
		>
	</div>
	<div>
		<h4 class={`font-bold text-${notification.level}-content`}>
			{notification.title}
		</h4>
		{#if notification.msg}
			<p class={`text-${notification.level}-content`}>
				{notification.msg}
			</p>
		{/if}
	</div>
</div>
