<script>
	import { ModeWatcher } from 'mode-watcher';
	import '../app.pcss';
	import Header from '$lib/components/Header.svelte';
	import { Toaster } from 'svelte-sonner';
</script>

<Header></Header>
<Toaster></Toaster>
<ModeWatcher></ModeWatcher>
<slot></slot>
