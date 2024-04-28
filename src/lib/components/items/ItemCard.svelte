<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

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

	let { item }: { item: Item } = $props();

  const handleItemClick = () => {
    goto(`/items/${item.id}`);
  };

</script>

<div 
  class="card min-h-64 h-full bg-base-300 shadow-2xl rounded-xl"
  on:click={handleItemClick}
  on:keypress={handleItemClick}
>
	<div class="card-body relative">
		<div class="flex items-center justify-between">
			<div>
        <div class="relative rounded-xl">
          <img 
            src={item.image_urls[0]} 
            alt={item.title} 
            class="mask object-cover rounded-lg" 
          />
          <div
            class="absolute rounded-lg text-center inset-0 bg-black bg-opacity-0 text-opacity-0 hover:bg-opacity-80 hover:text-opacity-100 transition-bg-opacity duration-150 flex items-center justify-center text-white"
          >
            {item.description}
          </div>
        </div>
				<div class=" my-4 mx-4 text-lg font-semibold">
					{item.title}
          <p class="text-gray-400">{item.profiles.location}</p>
				</div>
			</div>
		</div>
	</div>
</div>
