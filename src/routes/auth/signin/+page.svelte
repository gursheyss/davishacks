<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { toast } from 'svelte-sonner';

	let { data } = $props();
	let { supabase } = $derived(data);

	let email = $state('');

	async function signIn() {
		const { data, error: authError } = await supabase.auth.signInWithOtp({
			email: email
		});

		if (authError) {
			toast.error(authError.message);
		} else {
			toast.success('Sent login link to email');
		}
	}
</script>

<Card.Root class="w-full max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Login</Card.Title>
		<Card.Description>Enter your email below to login to your account.</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-4">
		<div class="grid gap-2">
			<Label for="email">Email</Label>
			<Input id="email" bind:value={email} type="email" placeholder="m@example.com" required />
		</div>
	</Card.Content>
	<Card.Footer>
		<Button on:click={signIn} class="w-full">Sign in</Button>
	</Card.Footer>
</Card.Root>
