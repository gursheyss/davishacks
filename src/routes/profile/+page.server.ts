import { error, redirect } from '@sveltejs/kit';

export const load = async ({ locals: { safeGetSession, supabase } }) => {
	const session = await safeGetSession();
	if (!session.user) {
		redirect(301, '/auth/signin');
	}
	const email = session.user.email;

	const { data: profileData, error } = await supabase
		.from('profiles')
		.select('first_name, last_name, email, location, school, items!profile_id (*)')
		.eq('email', email)
		.single();

		const itemIds = profileData.items.map(item => item.id);

	if (error) {
		console.error('error', error);
	}

	const { data: tradeData, error: tradeError } = await supabase
        .from('trades')
        .select('*')
        .in('item_traded', itemIds); // Assuming 'item_traded' is related to user's ID

    if (tradeError) {
        console.error('error', tradeError);
    }

		const fullItemDetails = await Promise.all(tradeData.map(async trade => {
			const { data: itemData, error: itemError } = await supabase
					.from('items')
					.select('*')
					.eq('id', trade.item_traded)
					.single(); // Assuming that item_traded corresponds to the id in items table
			
			if (itemError) {
					console.error('Error fetching item details:', itemError);
					return null; // Handle the error appropriately, perhaps returning null or an error state
			}

			return { ...trade, itemDetails: itemData };
	}));

	console.log(fullItemDetails);	
	return {
		profileData,
		tradeData: fullItemDetails
	};
};

export const actions = {
	editProfile: async ({ request, locals: { supabase, safeGetSession } }) => {
		// console.log('editProfile action');
		const session = await safeGetSession();
		if (!session.user) {
			redirect(301, '/auth/signin');
		}
		const email = session.user.email;
		const formData = await request.formData();

		const firstName = formData.get('firstName');
		const lastName = formData.get('lastName');

		// console.log('firstName:', firstName);
		// console.log('lastName:', lastName);

		const { error: dbError } = await supabase
			.from('profiles')
			.update({ first_name: firstName, last_name: lastName })
			.eq('email', email);

		if (dbError) {
			error(500, dbError.message);
		}
	}
};
