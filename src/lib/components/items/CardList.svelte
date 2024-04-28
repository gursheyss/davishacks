<script lang="ts">
	import ItemCard from '$lib/components/items/ItemCard.svelte';

	interface Item {
		id: number;
		profile_id: string;
		title: string;
		description: string;
		category: string;
		image_urls?: string[];
    status?: string;
    created_at: string;
    profiles: {
      location: string;
    }
	}


	let { items }: { items: Item[] } = $props();
</script>

<div class="flex w-full flex-wrap px-2">
	{#each items as item}
		<div class="mb-4 w-full px-2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
			<ItemCard {item} />
		</div>
	{/each}
</div>
