<script lang="ts">
	import EditProfile from '$lib/components/EditProfile.svelte';
	import ItemsList from '$lib/components/ItemsList.svelte';

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
</script>

Welcome!
<EditProfile
	email={data.session?.user.email}
	firstName={data.profileData?.first_name}
	lastName={data.profileData?.last_name}
></EditProfile>
<ItemsList {items}/>
