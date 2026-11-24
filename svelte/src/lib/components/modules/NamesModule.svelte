<script>
	import PlainText from '#lib/components/PlainText.svelte';

	/** A list of names, filling four columns evenly from lg, in one on phones. */
	let { names } = $props();
</script>

<div>
	<PlainText value={names} lines />
</div>

<style>
	@reference '../../../routes/layout.css';

	div {
		@apply text-body-lg text-trim;
		grid-column: 1 / -1;

		@media (width >= 1024px) {
			columns: 4;
			column-gap: var(--spacing-xs);
			font-size: 1.6rem;
			line-height: 1.3;
		}
	}
</style>
