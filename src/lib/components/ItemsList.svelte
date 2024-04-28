<script lang="ts">
	import { formatDistanceToNow, sub, startOfDay } from 'date-fns';
	import { Trash } from 'svelte-radix';
	import * as Card from '$lib/components/ui/card/index.js';

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

	const { items }: { items: Item[] } = $props();
</script>

<h1 class="text-center mb-4 text-3xl font-bold mt-8">Items</h1>
<div class="grid grid-cols-1 gap-4">
	<Card.Root class="w-full">
		<Card.Header>
			<div class="grid grid-cols-6 gap-4 font-bold">
				<div>Image</div>
				<div>Title</div>
				<div>Category</div>
				<div>Status</div>
				<div>Created</div>
			</div>
		</Card.Header>
		<Card.Content>
			{#each items as item (item?.title)}
				<div class="grid grid-cols-6 items-center gap-4 border-t px-4 py-2">
					{#if item?.image_urls && item?.image_urls.length > 0}
						 <div>
							 <img src={item?.image_urls[0]} alt={item?.title} class="mask h-16 w-16 object-cover" />
						 </div>
					{/if}
					<div>{item?.title}</div>
					<div>{item?.category}</div>
					<div>{item?.status}</div>
					<div>{formatDistanceToNow(item?.created_at)} ago</div>
					<div class="flex justify-end"><Trash /></div>
				</div>
			{/each}
		</Card.Content>
	</Card.Root>
</div>
