<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select/index.js';
	import { enhance } from '$app/forms';

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

	let selectedItems = $state([]);
</script>

<div class="flex flex-col items-start justify-center gap-8 pl-6 md:flex-row">
	<div class="w-full md:w-1/2">
		<Carousel.Root class="relative h-64 w-full">
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
						{#if data.myItems && data.myItems.length !== 0}
							<form action="?/submitTrade" method="POST" use:enhance>
								<Select.Root multiple>
									<Select.Trigger class="w-full">
										<Select.Value placeholder="Select your item(s)" />
									</Select.Trigger>
									<Select.Content>
										<Select.Group>
											<Select.Label>Your Items</Select.Label>
											{#each data.myItems as item}
												<Select.Item class="h-24 gap-4" value={item.id}>
													<img
														src={item.image_urls}
														alt={item.title}
														class="h-16 w-16 object-cover"
													/>
													{item.title}
												</Select.Item>
											{/each}
										</Select.Group>
									</Select.Content>
									<Select.Input name="tradeIds" />
								</Select.Root>
								<Button type="submit">Submit Trade</Button>
							</form>
						{/if}
					</Tabs.Content>
				</Tabs.Root>
			</Card.Content>
		</Card.Root>
	</div>
</div>
