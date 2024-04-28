<script lang="ts">
	import { formatDistanceToNow, sub, startOfDay } from 'date-fns';
	import { Trash } from 'svelte-radix';
	import * as Card from '$lib/components/ui/card/index.js';

	const items = [
		{
			image:
				'https://www.statebicycle.com/cdn/shop/products/6061-eBikeCommuter-MatteBlack_1.jpg?v=1684443969',
			title: 'Super cool black bike',
			category: 'Bikes',
			status: 'Listed',
			createdAt: startOfDay(sub(new Date(), { days: 1 }))
		},
		{
			image:
				'https://www.statebicycle.com/cdn/shop/products/6061-eBikeCommuter-MatteBlack_1.jpg?v=1684443969',
			title: 'Super cool black bike 2',
			category: 'Bikes',
			status: 'Listed',
			createdAt: startOfDay(sub(new Date(), { days: 1 }))
		},
		{
			image:
				'https://www.statebicycle.com/cdn/shop/products/6061-eBikeCommuter-MatteBlack_1.jpg?v=1684443969',
			title: 'Super cool black bike 3',
			category: 'Bikes',
			status: 'Listed',
			createdAt: startOfDay(sub(new Date(), { days: 1 }))
		},
		{
			image:
				'https://www.statebicycle.com/cdn/shop/products/6061-eBikeCommuter-MatteBlack_1.jpg?v=1684443969',
			title: 'Super cool black bike 4',
			category: 'Bikes',
			status: 'Listed',
			createdAt: startOfDay(sub(new Date(), { days: 1 }))
		}
		// ... more items ...
	];
</script>

<h1 class="mb-4 text-3xl font-bold">Items</h1>
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
			{#each items as item (item.title)}
				<div class="grid grid-cols-6 items-center gap-4 border-t px-4 py-2">
					<div>
						<img src={item.image} alt={item.title} class="mask h-16 w-16 object-cover" />
					</div>
					<div>{item.title}</div>
					<div>{item.category}</div>
					<div>{item.status}</div>
					<div>{formatDistanceToNow(item.createdAt)} ago</div>
					<div class="flex justify-end"><Trash /></div>
				</div>
			{/each}
		</Card.Content>
	</Card.Root>
</div>
