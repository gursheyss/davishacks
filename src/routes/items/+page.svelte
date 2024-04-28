<script>
  import CardList from '$lib/components/items/CardList.svelte';
  const { data } = $props();
  const { items } = $derived(data);
</script>

{#if items && items?.length > 0}
  <div class="my-8">
    <div class="flex justify-center text-5xl">
      Items
    </div>
  </div>
  <CardList {items} />
{:else}
  <p class="text-center">No items listed!</p>
{/if}
