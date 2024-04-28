import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data, error } = await supabase
		.from('items')
		.select(
			`
      *,
      profiles (
        location
      )
    `
		)
		.eq('status', 'Available');

	if (error) {
		console.error('error', error);
	}

	return {
		items: data
	};
};
