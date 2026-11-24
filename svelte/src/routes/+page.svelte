<script>
	import CardColumns from '#lib/components/CardColumns.svelte';
	import FeedCard from '#lib/components/FeedCard.svelte';

	let { data } = $props();
</script>

<h1 class="sr-only">MIT Norman B. Leventhal Center for Advanced Urbanism</h1>

<CardColumns items={data.feed} class="lg:mb-xl">
	{#snippet card(item)}
		<FeedCard {item} />
	{/snippet}
</CardColumns>
