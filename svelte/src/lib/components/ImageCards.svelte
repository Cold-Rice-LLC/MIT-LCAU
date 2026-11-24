<script>
	/** ImageCards three across, each `card` rendering one of `items`; stacked on phones. */
	let { items, card } = $props();
</script>

<ul class="col-span-full grid gap-x-xs gap-y-lg lg:grid-cols-3 lg:gap-y-3xl">
	{#each items as item (item._id)}
		<li>{@render card(item)}</li>
	{/each}
</ul>
