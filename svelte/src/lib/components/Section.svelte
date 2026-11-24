<script>
	/**
	 * A section of a page, like a module or Related Research, with its
	 * heading centred above it. From lg it spans the page's 9 columns as a
	 * subgrid, so what's inside places itself in them, like the middle 7.
	 * Row gaps only, so the subgrid keeps the page's column gap. With
	 * `smallHeading`, the heading starts the paragraph column instead, and
	 * 'close' brings it nearer what's under it on phones.
	 */
	let { id, heading, smallHeading, children } = $props();
</script>

<section {id} class={['end-gap scroll-mt-3xl', smallHeading === 'close' && 'close']}>
	{#if heading}
		<h2
			class={['col-span-full text-trim', smallHeading ? 'measure text-h3' : 'text-center text-h2']}
		>
			{heading}
		</h2>
	{/if}
	{@render children()}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		row-gap: var(--spacing-lg);
		grid-column: 1 / -1;
		margin-top: var(--spacing-2xl);

		@media (width >= 1024px) {
			display: grid;
			grid-template-columns: subgrid;
			row-gap: var(--spacing-xl);
			margin-top: var(--spacing-3xl);
		}

		/* Closer on phones, under a small heading over text */
		&.close {
			row-gap: var(--spacing-md);

			@media (width >= 1024px) {
				row-gap: var(--spacing-xl);
			}
		}
	}
</style>
