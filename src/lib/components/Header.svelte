<script lang="ts">
	import LightSwitch from './LightSwitch.svelte';
	import Button from './ui/button/button.svelte';
</script>

<div class="flex items-center justify-between p-2">
	<h1 class="text-2xl font-bold">lendingsite</h1>
	<div class="flex items-center space-x-2">
		<form action="/?/login">
			<Button type="submit">Login</Button>
		</form>
		<LightSwitch></LightSwitch>
	</div>
</div>
