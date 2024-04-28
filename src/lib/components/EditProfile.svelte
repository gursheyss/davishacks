<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';

	interface ProfileInfo {
		email: string | undefined;
		firstName: string | undefined;
		lastName: string | undefined;
	}

	let { email, firstName, lastName }: ProfileInfo = $props();
</script>

<form
	action="?/editProfile"
	method="POST"
	use:enhance={() => {
		return async ({ result }) => {
			if (result.type === 'success') {
				invalidateAll();
				toast.success('Profile updated successfully');
			}
		};
	}}
>
	<div class="grid w-full items-center gap-4">
		<div class="flex flex-col space-y-2">
			<Label for="email">Email</Label>
			<Input id="email" type="email" disabled bind:value={email} />
		</div>
		<div class="flex flex-col space-y-2">
			<Label for="firstName">First Name</Label>
			<Input id="firstName" placeholder="Your first name" name="firstName" bind:value={firstName} />
		</div>
		<div class="flex flex-col space-y-2">
			<Label for="lastName">Last Name</Label>
			<Input id="lastName" placeholder="Your last name" name="lastName" bind:value={lastName} />
		</div>
		<div class="flex flex-col space-y-2">
			<Label for="location">Location</Label>
			<Select.Root>
				<Select.Trigger class="w-full">
					<Select.Value placeholder="UC Davis" />
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="ucdavis">UC Davis</Select.Item>
				</Select.Content>
			</Select.Root>
		</div>
	</div>
	<Button type="submit">Save</Button>
</form>
