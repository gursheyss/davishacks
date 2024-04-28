<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import { Input } from '$lib/components/ui/input';

	let api: CarouselAPI;
	let current = $state(0);
	let count = $state(0);

	$effect(() => {
		count = api.scrollSnapList().length;
		current = api.selectedScrollSnap() + 1;

		api.on('select', () => {
			current = api.selectedScrollSnap() + 1;
		});
	});

	interface Item {
		id: number;
		profile_id: string;
		title: string;
		description: string;
		category: string;
		image_urls: string[];
		status: string;
		created_at: string;
	}

	let { data } = $props();

	let { item }: { item: Item } = $derived(data);
</script>

<div class="flex flex-col items-start justify-center gap-8 pl-6 md:flex-row">
	<div class="w-full md:w-1/2">
		<Carousel.Root bind:api class="relative h-64 w-full">
			<Carousel.Content>
				{#each item.image_urls as url}
					<Carousel.Item>
						<img src={url} alt={item.title} class="inset-0 h-full w-full object-cover" />
					</Carousel.Item>
				{/each}
			</Carousel.Content>
			<Carousel.Previous />
			<Carousel.Next />
		</Carousel.Root>
		<div class="py-2 text-center text-sm text-muted-foreground">
			Image {current} of {count}
		</div>
	</div>
	<div class="w-full space-y-6 md:w-1/2">
		<Card.Root>
			<Card.Header>
				<Card.Title>{item.title}</Card.Title>
				<Card.Description>{item.description}</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="space-y-2">
					<p><strong>Category:</strong> {item.category}</p>
					<p><strong>Status:</strong> {item.status}</p>
					<p><strong>Created At:</strong> {item.created_at}</p>
				</div>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title>Make an Offer</Card.Title>
			</Card.Header>
			<Card.Content>
				<Tabs.Root value="trade" class="w-full">
					<Tabs.List class="grid grid-cols-2">
						<Tabs.Trigger value="trade">Trade</Tabs.Trigger>
						<Tabs.Trigger value="cash">Cash</Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content value="trade" class="space-y-2">
						<p>Select items to include in your trade offer:</p>
						{JSON.stringify(data.myItems)}
						<Button>Send Trade Offer</Button>
					</Tabs.Content>
					<Tabs.Content value="cash">
						<div class="flex flex-col items-center space-y-4">
							<div class="relative w-full max-w-xs">
								<span class="absolute inset-y-0 left-0 flex items-center pl-3 text-2xl">$</span>
								<Input
									type="number"
									min="0.01"
									step="0.01"
									placeholder="0.00"
									class="pl-8 text-2xl"
								/>
							</div>
							<Button class="w-full max-w-xs">Send Cash Offer</Button>
						</div>
					</Tabs.Content>
				</Tabs.Root>
			</Card.Content>
		</Card.Root>
	</div>
</div>
