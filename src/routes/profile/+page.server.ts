import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { safeGetSession, supabase } }) => {
	const session = await safeGetSession();
	if (!session.user) {
		redirect(301, '/auth/signin');
	}
	const email = session.user.email;

	const { data, error } = await supabase
		.from('profiles')
		.select('first_name, last_name')
		.eq('email', email)
		.single();

	return {
		profileData: data
	};
};

export const actions = {
	editProfile: async ({ request, locals: { supabase, safeGetSession } }) => {
		console.log('editProfile action');
		const session = await safeGetSession();
		if (!session.user) {
			redirect(301, '/auth/signin');
		}
		const email = session.user.email;
		const formData = await request.formData();

		const firstName = formData.get('firstName');
		const lastName = formData.get('lastName');

		console.log('firstName:', firstName);
		console.log('lastName:', lastName);

		const { data, error } = await supabase
			.from('profiles')
			.update({ first_name: firstName, last_name: lastName })
			.eq('email', email);
	}
};
