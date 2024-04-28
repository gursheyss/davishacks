import { error } from '@sveltejs/kit';

export const load = async ({ params, locals: { supabase } }) => {
	const { id } = params;
	const { data, error: dbError } = await supabase.from('items').select().eq('id', id).single();
	if (dbError) {
		error(500, dbError.message);
	}
	console.log(data);
	return {
		item: data
	};
};
