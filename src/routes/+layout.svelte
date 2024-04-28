<script>
	import { ModeWatcher } from 'mode-watcher';
	import '../app.pcss';
	import Header from '$lib/components/Header.svelte';
	import { Toaster } from 'svelte-sonner';
	import { mode } from 'mode-watcher';

	let { data } = $props();
	let { supabase } = $derived(data);
	let signedIn = $derived(!!data.session?.user);
</script>

<ModeWatcher defaultMode={'dark'}></ModeWatcher>
<Header {signedIn} {supabase}></Header>
<Toaster position={'top-right'} theme={$mode}></Toaster>
<slot></slot>
