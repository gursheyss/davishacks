<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { toast } from 'svelte-sonner';
	import Reload from 'svelte-radix/Reload.svelte';
	import { Textarea } from '$lib/components/ui/textarea/index.js';

	let isLoading = $state(false);

	const categories = [
		{ value: 'electronics', label: 'Electronics' },
		{ value: 'furniture', label: 'Furniture' },
		{ value: 'clothing', label: 'Clothing' },
		{ value: 'books', label: 'Books' },
		{ value: 'other', label: 'Other' }
	];

	const conditions = [
		{ value: 'new', label: 'New' },
		{ value: 'like_new', label: 'Like New' },
		{ value: 'good', label: 'Good' },
		{ value: 'fair', label: 'Fair' },
		{ value: 'used', label: 'Used' }
	];
	interface Select {
		value: string | undefined;
		label: string | undefined;
	}

	let selectedCategory: Select = $state({ value: undefined, label: undefined });
	let selectedCondition: Select = $state({ value: undefined, label: undefined });
</script>

<div class="mx-auto max-w-md rounded-lg p-6">
	<h2 class="mb-6 text-2xl font-bold">Upload Item</h2>
	<form
		method="POST"
		action="?/list"
		enctype="multipart/form-data"
		use:enhance={() => {
			isLoading = true;
			return async ({ result }) => {
				if (result.type === 'success') {
					isLoading = false;
					toast.success('Item uploaded successfully');
				}
				if (result.type === 'error') {
					isLoading = false;
					toast.error(result.error.message);
				}
			};
		}}
	>
		<div class="grid gap-6">
			<div>
				<Label for="title" class="mb-1 block">Title</Label>
				<Input id="title" name="title" required placeholder="Title of your item" class="w-full" />
			</div>
			<div>
				<Label for="description" class="mb-1 block">Description</Label>
				<Textarea
					id="description"
					name="description"
					placeholder="Description of your item"
					class="w-full"
					required
					minlength={25}
				/>
			</div>

			<div class="relative w-full">
				<span class="absolute inset-y-0 left-0 flex items-center pl-3 text-2xl">$</span>
				<Input type="number" min="0.01" step="0.01" placeholder="0.00" class="pl-8 text-2xl" />
			</div>
			<div>
				<Label for="category" class="mb-1 block">Category</Label>
				<Select.Root name="category" bind:selected={selectedCategory} required>
					<Select.Trigger id="category">
						<Select.Value placeholder="Select a category" />
					</Select.Trigger>
					<Select.Content>
						{#each categories as category}
							<Select.Item value={category.value} label={category.label}
								>{category.label}</Select.Item
							>
						{/each}
					</Select.Content>
				</Select.Root>
				<input type="hidden" name="category" value={selectedCategory.value} />
			</div>
			<div>
				<Label for="condition" class="mb-1 block">Condition</Label>
				<Select.Root name="condition" bind:selected={selectedCondition} required>
					<Select.Trigger id="condition">
						<Select.Value placeholder="Select a condition" />
					</Select.Trigger>
					<Select.Content>
						{#each conditions as condition}
							<Select.Item value={condition.value} label={condition.label}
								>{condition.label}</Select.Item
							>
						{/each}
					</Select.Content>
				</Select.Root>
				<input type="hidden" name="condition" value={selectedCondition.value} />
			</div>
			<div>
				<Label for="images" class="mb-1 block">Images</Label>
				<Input
					type="file"
					id="images"
					name="images"
					accept="image/*"
					multiple
					class="w-full pr-20"
					required
				/>
			</div>
			<div class="flex justify-end">
				<Button disabled class="mr-2">Upload</Button>
				{#if isLoading}
					<Button disabled>
						<Reload class="mr-2 h-4 w-4 animate-spin" />
						Uploading...
					</Button>
				{:else}
					<Button type="submit">Upload and List</Button>
				{/if}
			</div>
		</div>
	</form>
</div>
