import { error } from '@sveltejs/kit';

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
		return {
			item: itemData,
			myItems: profileData
		};
	}

	return {
		item: itemData
	};
};
