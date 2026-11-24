<script>
	import Figure from '#lib/components/Figure.svelte';
	import { croppedSize } from '#lib/sanity/images.js';

	/**
	 * One image, or two side by side, at their own shapes and centred. From
	 * lg a landscape image is 7 of the page's 9 columns wide and any other 5.
	 * Two share the row: 4 columns for a landscape beside a portrait, 3 for a
	 * portrait, and two landscapes split 7. Two halve the row on phones.
	 */
	let { images = [] } = $props();

	let figures = $derived.by(() => {
		const shown = images.flatMap((image) => {
			const size = croppedSize(image);
			return size ? [{ image, aspect: size.width / size.height }] : [];
		});
		const pair = shown.length > 1;
		const allLandscape = shown.every(({ aspect }) => aspect > 1);

		const columnsOf = (aspect) => {
			if (!pair) return aspect > 1 ? 7 : 5;
			if (allLandscape) return 3.5;
			return aspect > 1 ? 4 : 3;
		};

		return shown.map(({ image, aspect }) => {
			const columns = columnsOf(aspect);
			// A column is about 9vw from lg
			const sizes = `(width >= 1024px) ${columns * 9}vw, ${pair ? 50 : 100}vw`;
			return { image, aspect, columns, sizes };
		});
	});
</script>

<div class="images">
	{#each figures as { image, aspect, columns, sizes } (image._key)}
		<Figure {image} {aspect} {sizes} rounded={false} style="--columns: {columns}" />
	{/each}
</div>

<style>
	.images {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		gap: var(--spacing-xs);
		grid-column: 1 / -1;

		& > :global(figure) {
			flex: 1;
			min-width: 0;

			/* --columns of the 9, with the gaps between them */
			@media (width >= 1024px) {
				flex: 0 0 calc((100% + var(--spacing-xs)) * var(--columns) / 9 - var(--spacing-xs));
			}
		}
	}
</style>
