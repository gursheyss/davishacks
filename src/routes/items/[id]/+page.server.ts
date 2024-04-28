import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params, locals: { supabase, safeGetSession } }) => {
	const session = await safeGetSession();
	const { id } = params;
	const { data: itemData, error: dbError } = await supabase
		.from('items')
		.select()
		.eq('id', id)
		.single();
	if (dbError) {
		error(500, dbError.message);
	}

	if (session.user) {
		const { data: profileData, error: profileError } = await supabase
			.from('items')
			.select('id, title, image_urls, value')
			.eq('profile_id', session.user.id);

		if (profileData) {
			profileData.forEach((item) => {
				if (item.image_urls && item.image_urls.length > 0) {
					item.image_urls = [item.image_urls[0]];
				}
			});
		}

		return {
			item: itemData,
			myItems: profileData
		};
	}

	return {
		item: itemData
	};
};

export const actions = {
	submitTrade: async ({ request, params, locals: { supabase, safeGetSession } }) => {
		const session = await safeGetSession();
		if (!session.user) {
			error(401, 'Unauthorized');
		}
		const formData = await request.formData();
		const tradeIds = JSON.parse(formData.get('tradeIds'));
		
		const errors = [];
		const insertions = [];

		for (const tradeId of tradeIds) {
			const insertion = await supabase
				.from('trades')
				.insert({
					item_id: params.id,
					offerer_id: session.user.id,
					item_traded: tradeId,
					status: 'Pending'
				})
				.then(({ data, error }) => {
					if (error) {
						errors.push(error);
					}
				});
				insertions.push(insertion);
		}

		await Promise.all(insertions);

		if (errors.length > 0) {
			throw new Error('Failed to insert some trades.');  // Handle errors collectively
		}

		redirect(303, '/profile');
	}
};
