<script lang="ts">
	import EditProfile from '$lib/components/EditProfile.svelte';
	import ItemsList from '$lib/components/ItemsList.svelte';
	import { fade, blur } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button/index.js';

	interface Item {
    id: number;
    profile_id: string;
    title: string;
    description: string;
    category: string;
    image_urls?: string[];
    status?: string;
    created_at: string;
  };

	let { data } = $props();
	let { profileData } = $derived(data);
	let { items } = $derived(profileData);

	let showModal = $state(false);

	function toggleModal() {
		showModal = !showModal;
	}
</script>

<div>
	<div class:blur={showModal}>
		<div class="flex justify-center mt-8">
			<div class="flex flex-col items-center">
				<h1 class="text-3xl font-bold">Profile</h1>
				<p class="text-gray-500 text-xl">Welcome back, {profileData?.first_name}!</p>
				<p class="text-gray-500 text-xl">Email: {profileData?.email}</p>
				<p class="text-gray-500 text-xl">School: {!profileData?.school ? 'No School' : profileData?.school}</p>
				<p class="text-gray-500 text-xl">Location: {profileData?.location}</p>
				<Button on:click={toggleModal} class="mt-4">Edit Profile</Button>
			</div>
		</div>
		<ItemsList {items} />
	</div>
  {#if showModal}
    <div
      class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-20 flex justify-center items-center"
      on:click|self={toggleModal}
      transition:fade={{ duration: 200 }}
    >
      <div class="bg-white rounded-md p-1 z-20" transition:fade={{ duration: 200 }}>
        <button
          class="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          on:click={toggleModal}>
          &times;
        </button>
        <EditProfile
          email={data.session?.user.email}
          firstName={data.profileData?.first_name}
          lastName={data.profileData?.last_name}
        />
      </div>
    </div>
  {/if}
</div>

<style>
  .blur {
    filter: blur(4px);
  }
</style>