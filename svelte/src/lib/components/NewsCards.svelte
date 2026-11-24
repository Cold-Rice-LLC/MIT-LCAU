<script>
	import NewsCard from '#lib/components/NewsCard.svelte';

	/** News posts three across, as on the landing and under More News; stacked on phones. */
	let { posts } = $props();
</script>

<ul class="col-span-full grid gap-x-xs gap-y-lg lg:grid-cols-3 lg:gap-y-3xl">
	{#each posts as post (post._id)}
		<li><NewsCard {post} /></li>
	{/each}
</ul>
