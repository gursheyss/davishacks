<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';

	let api: CarouselAPI;
	let current = 0;
	let count = 0;

	$: if (api) {
		count = api.scrollSnapList().length;
		current = api.selectedScrollSnap() + 1;

		api.on('select', () => {
			current = api.selectedScrollSnap() + 1;
		});
	}

	// Example data
	const item = {
		id: 1,
		profile_id: '107e6e99-ac29-4c5c-8ded-764dc0b27353',
		title: 'Epic Bike',
		description: 'A fuckin bike to let you ride around school',
		category: 'Bike',
		image_urls: [
			'https://www.statebicycle.com/cdn/shop/products/6061-eBikeCommuter-MatteBlack_1.jpg?v=1684443969'
		],
		status: 'Available',
		created_at: '2024-04-28T09:51:15.869674'
	};
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
						<Tabs.Trigger value="trade">Trade Offer</Tabs.Trigger>
						<Tabs.Trigger value="cash">Cash Offer</Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content value="trade" class="space-y-2">
						<!-- Trade offer section -->
						<p>Select items to include in your trade offer:</p>
						<!-- Add a list or grid of user's items to select for trade -->
						<Button>Send Trade Offer</Button>
					</Tabs.Content>
					<Tabs.Content value="cash" class="space-y-2">
						<!-- Cash offer section -->
						<p>Enter your cash offer:</p>
						<!-- Add an input field for cash offer amount -->
						<Button>Send Cash Offer</Button>
					</Tabs.Content>
				</Tabs.Root>
			</Card.Content>
		</Card.Root>
	</div>
</div>
