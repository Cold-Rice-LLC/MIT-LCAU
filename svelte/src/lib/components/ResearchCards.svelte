<script>
	import ResearchCard from '#lib/components/ResearchCard.svelte';

	/** Research, exhibitions and courses four across, two on phones. */
	let { items, class: className } = $props();
</script>

<ul class={['col-span-full card-grid', className]}>
	{#each items as item (item._id)}
		<li><ResearchCard {item} /></li>
	{/each}
</ul>
