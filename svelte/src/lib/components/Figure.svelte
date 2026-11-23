<script>
	import ImageFrame from '#lib/components/ImageFrame.svelte';

	/**
	 * A figure image (3:2 by default, rounded) with its caption below.
	 * `clamp` cuts the caption to two lines, as in a carousel; other
	 * attributes, like `class`, go on the figure.
	 */
	let { image, aspect = 3 / 2, sizes, loading, clamp = false, ...rest } = $props();
</script>

<figure {...rest}>
	<ImageFrame as="div" {image} {aspect} {sizes} {loading} class="rounded-def" />
	{#if image.caption}
		<figcaption class={['mt-xs text-body', clamp ? 'line-clamp-2 text-trim-clipped' : 'text-trim']}>
			{image.caption}
		</figcaption>
	{/if}
</figure>
