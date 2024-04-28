<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  let noPic = 'static/No Image Placeholder.jpg';

  interface Item {
    id: number;
    profile_id: string;
    title: string;
    description: string;
    category: string;
    image_urls?: string[];
    status?: string;
    created_at: string;
    profiles: { location: string };
  }

  let { item }: { item: Item } = $props();

  const handleItemClick = () => {
    goto(`/items/${item.id}`);
  };
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="border card min-h-64 h-full bg-base-300 shadow-xl rounded-xl"
  on:click={handleItemClick}
  on:keypress={handleItemClick}
>
  <div class="card-body relative">
    <div class="flex items-center justify-between">
      <div>
        <div class="relative rounded-xl">
          {#if item.image_urls && item.image_urls.length > 0}
            <div class="h-48 w-full rounded-lg overflow-hidden">
              <div class="relative w-full h-auto">
                <img
                  src={item.image_urls[0]}
                  alt={item.title}
                  class="w-full h-full object-position-center"
                />
              </div>
            </div>
          {:else}
            <div
              class="h-48 w-full rounded-lg overflow-hidden bg-gray-300 flex items-center justify-center"
            >
              <div class="relative w-full h-auto">
                <img
                  src="https://www.islandofworldpeace.ie/wp-content/uploads/2019/03/no-image.jpg"
                  alt="no pic"
                  class="object-cover w-full h-full"
                />
              </div>
            </div>
          {/if}
          <div
            class="absolute rounded-lg text-center inset-0 bg-black bg-opacity-0 text-opacity-0 hover:bg-opacity-80 hover:text-opacity-100 transition-bg-opacity duration-150 flex items-center justify-center text-white"
          >
            {item.description}
          </div>
        </div>
        <div class="my-4 mx-4 text-lg font-semibold">
          {item.title}
          <p class="text-gray-400">{item.profiles.location}</p>
        </div>
      </div>
    </div>
  </div>
</div>