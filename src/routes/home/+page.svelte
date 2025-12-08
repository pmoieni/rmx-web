<script lang="ts">
	import { JamAPI } from '$lib/api/jam';

	let roomID = '';

	function createRoom() {
		JamAPI.post('http://localhost:1234/jam/', JSON.stringify({ name: 'hmm', bpm: 120 }));
	}
</script>

<button onclick={createRoom}>Create Room</button><br />
<input placeholder="room id" bind:value={roomID} type="text" />
<button>Join Room</button>

<style>
	button {
		background-color: #000;
		color: #fff;
		padding: 1rem;
	}

	input {
		background-color: #aaa;
		padding: 1rem;
	}
</style>
