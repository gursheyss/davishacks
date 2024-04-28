<script lang="ts">
	import EditProfile from '$lib/components/EditProfile.svelte';
	import ItemsList from '$lib/components/ItemsList.svelte';
	import { fade, blur } from 'svelte/transition';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog';

	interface Item {
		id: number;
		profile_id: string;
		title: string;
		description: string;
		category: string;
		image_urls?: string[];
		status?: string;
		created_at: string;
	}

	let { data } = $props();
	let { profileData } = $derived(data);

	let showModal = $state(false);

	function toggleModal() {
		showModal = !showModal;
	}
</script>

<div>
	<div>
		<div class="mt-8 flex justify-center">
			<div class="flex flex-col items-center">
				<h1 class="text-3xl font-bold">Profile</h1>
				<p class="text-xl text-gray-500">Welcome back, {profileData?.first_name}!</p>
				<p class="text-xl text-gray-500">Email: {profileData?.email}</p>
				<p class="text-xl text-gray-500">
					School: {!profileData?.school ? 'No School' : profileData?.school}
				</p>
				<p class="text-xl text-gray-500">Location: {profileData?.location}</p>
				<Dialog.Root>
					<Dialog.Trigger class={buttonVariants()}>Edit Profile</Dialog.Trigger>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>Edit profile</Dialog.Title>
						</Dialog.Header>
						<EditProfile
							email={data.session?.user.email}
							firstName={data.profileData?.first_name}
							lastName={data.profileData?.last_name}
						/>
					</Dialog.Content>
				</Dialog.Root>
			</div>
		</div>
	</div>
</div>
