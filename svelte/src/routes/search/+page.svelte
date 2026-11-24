<script>
	import { goto } from '$app/navigation';
	import SearchScreen from '#lib/components/layout/SearchScreen.svelte';

	let { data } = $props();
</script>

<!-- Without the layout's nav, Explore links and footer, as when it opens
     over a page. There's no page to go back to, so closing it goes home. -->
<SearchScreen search={data.search} onclose={() => goto('/')} />
