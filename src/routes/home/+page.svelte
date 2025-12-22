<script lang="ts">
	import { UsersAPI } from '$lib/api/users';
	import GithubIcon from '$lib/assets/icons/GithubIcon.svelte';
	import GoogleIcon from '$lib/assets/icons/GoogleIcon.svelte';
	import UserIcon from '$lib/assets/icons/UserIcon.svelte';
	import { Button, Popover } from 'bits-ui';

	const userAPI = new UsersAPI();
</script>

<nav class="flex w-full items-center justify-between p-4">
	<Popover.Root>
		<Popover.Trigger class="btn btn-primary"><UserIcon />Log in</Popover.Trigger>
		<Popover.Portal>
			<Popover.Content class="card m-2 gap-2 bg-base-100 p-2">
				<Button.Root class="btn btn-accent" onclick={() => userAPI.authenticate('github')}>
					<GithubIcon />
					GitHub
				</Button.Root>
				<Button.Root class="btn btn-accent" onclick={() => userAPI.authenticate('google')}>
					<GoogleIcon />
					Google
				</Button.Root>
			</Popover.Content>
		</Popover.Portal>
	</Popover.Root>
</nav>
