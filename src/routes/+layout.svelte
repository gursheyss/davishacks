<script>
	import { ModeWatcher } from 'mode-watcher';
	import '../app.pcss';
	import Header from '$lib/components/Header.svelte';
</script>

<Header></Header>
<ModeWatcher></ModeWatcher>
<slot></slot>
