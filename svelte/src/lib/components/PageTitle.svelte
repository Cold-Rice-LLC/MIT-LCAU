<script>
	/** The large centred heading over a landing page's list, like "People". */
	let { children } = $props();
</script>

<h1>{@render children()}</h1>

<style>
	@reference '../../routes/layout.css';

	h1 {
		@apply text-h1 text-trim;
		grid-column: 1 / -1;
		padding-block: 6rem var(--spacing-2xl);
		text-align: center;

		@media (width >= 1024px) {
			padding-block: var(--spacing-3xl) 12rem;
		}
	}
</style>
