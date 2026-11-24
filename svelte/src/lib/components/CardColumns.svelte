<script>
	/**
	 * Large cards in three columns from lg, each `card` rendering one of
	 * `items`. The columns each stack their own, so cards are as tall as they
	 * need; on phones the columns drop away and the cards go two across, in
	 * their order, as tall as each other unless `class` aligns them.
	 */
	let { items, card, class: className } = $props();

	// Every third item, for each column, with its place among them all
	let columns = $derived(
		[0, 1, 2].map((column) =>
			items.map((item, i) => ({ item, i })).filter(({ i }) => i % 3 === column)
		)
	);
</script>

<div class={['col-span-full card-grid lg:grid-cols-3', className]}>
	{#each columns as column, n (n)}
		<ul class="contents lg:flex lg:flex-col lg:gap-xs">
			{#each column as { item, i } (item._id ?? item._key)}
				<li style:order={i}>{@render card(item)}</li>
			{/each}
		</ul>
	{/each}
</div>
