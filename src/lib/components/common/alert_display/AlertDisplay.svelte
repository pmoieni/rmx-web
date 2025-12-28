<script lang="ts">
	import Alert from "./Alert.svelte";
	import { notifications } from "./index.svelte";
</script>

<div
	class="pointer-events-none fixed top-0 left-0 flex h-full w-full flex-col items-end justify-start gap-2 p-2"
>
	{#each notifications.values() as notif (notif.id)}
		<Alert notification={notif} />
	{/each}
</div>
