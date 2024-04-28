<script lang="ts">
	let { data } = $props();
	import EditProfile from '$lib/components/EditProfile.svelte';
	import ItemsList from '$lib/components/ItemsList.svelte';
</script>

Welcome!
<EditProfile
	email={data.session?.user.email}
	firstName={data.profileData?.first_name}
	lastName={data.profileData?.last_name}
></EditProfile>
<ItemsList></ItemsList>
