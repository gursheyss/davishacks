<script lang="ts">
  import { ArrowRightLeft } from "lucide-svelte";

  interface Item {
		id: number;
		profile_id: string;
		title: string;
		description: string;
		category: string;
		image_urls?: string[];
		status?: string;
		created_at: string;
	}

  interface Trade {
    id: number;
    item_id: number;
    item_traded: number[];
    offerer_id: string;
    status?: string;
    itemDetails: Item[];
  }

    let { trades }: { trades: Trade[] } = $props();
    let { itemDetails } = $derived(trades);
</script>

<div class="flex w-full flex-wrap px-2">
	{#each trades as trade}
		<div class="flex mb-4 w-full px-2">
			<div class="mr-4">Trade for {trade.itemDetails.title}</div>
		</div>
	{/each}
</div>