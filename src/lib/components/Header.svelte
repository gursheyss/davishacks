<script lang="ts">
	import { toast } from 'svelte-sonner';
	import LightSwitch from './LightSwitch.svelte';
	import Button from './ui/button/button.svelte';
	import type { SupabaseClient } from '@supabase/supabase-js';

	let { signedIn, supabase }: { signedIn: boolean; supabase: SupabaseClient<any, 'public', any> } =
		$props();

	async function signOut() {
		const { error } = await supabase.auth.signOut();

		if (error) {
			toast.error(error.message);
		}
	}
</script>

<div class="flex items-center justify-between p-2">
	<h1 class="text-3xl font-bold">GrantMe</h1>
	<div class="flex items-center space-x-2">
		{#if !signedIn}
			<Button href="/auth/signin">Login</Button>
		{:else}
			<Button on:click={signOut}>Logout</Button>
		{/if}
		<LightSwitch></LightSwitch>
	</div>
</div>
