<script>
	import { ModeWatcher } from 'mode-watcher';
	import '../app.pcss';
	import Header from '$lib/components/Header.svelte';
	import { Toaster } from 'svelte-sonner';

	let { data } = $props();
	let { supabase } = $derived(data);
	let signedIn = $derived(!!data.session?.user);
</script>

<Header {signedIn} {supabase}></Header>
<Toaster></Toaster>
<ModeWatcher></ModeWatcher>
<slot></slot>
