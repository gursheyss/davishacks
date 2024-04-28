import { error, redirect } from '@sveltejs/kit';

export const load = async ({ locals: { safeGetSession } }) => {
	const session = await safeGetSession();
	if (!session.user) {
		redirect(301, '/auth/signin');
	}
};

export const actions = {
	list: async ({ request, locals: { supabase, safeGetSession } }) => {
		const session = await safeGetSession();
		if (!session.user) {
			redirect(301, '/login');
		}

		const formData = await request.formData();
		const title = formData.get('title') as string;
		const description = formData.get('description') as string;
		const category = formData.get('category') as string;
		const images = formData.getAll('images') as File[];
		const condition = formData.get('condition') as string;

		const imageUrls: string[] = [];

		const { data: itemData, error: itemError } = await supabase
			.from('items')
			.insert({
				profile_id: session.user.id,
				title,
				description,
				category,
				condition
			})
			.select('id')
			.single();

		if (itemError) {
			console.error('Error inserting item data:', itemError);
			error(500, 'Error inserting item data: ' + itemError.message);
		}

		const itemId = itemData.id;

		for (const image of images) {
			const uniqueId = crypto.randomUUID();
			const imageName = `${session.user.id}/${itemId}/${uniqueId}-${image.name}`;

			const { data: uploadData, error: uploadError } = await supabase.storage
				.from('images')
				.upload(imageName, image);

			if (uploadError) {
				console.error('Error uploading image:', uploadError);
				return error(500, 'Error uploading image: ' + uploadError.message);
			}

			imageUrls.push(
				'https://magxivgndfjxtpfszveg.supabase.co/storage/v1/object/public/images/' +
					uploadData.path
			);
		}

		console.log('imageUrls:', imageUrls);

		const { error: updateError } = await supabase
			.from('items')
			.update({ image_urls: imageUrls })
			.eq('id', itemId);

		if (updateError) {
			console.error('Error updating item data:', updateError);
			return error(500, 'Error updating item data: ' + updateError.message);
		}
	}
};
