<script>
	import ImageFrame from '#lib/components/ImageFrame.svelte';

	/**
	 * A figure image (3:2 and rounded by default) with its caption below.
	 * `clamp` cuts the caption to two lines, as in a carousel; other
	 * attributes, like `class`, go on the figure.
	 */
	let {
		image,
		aspect = 3 / 2,
		sizes,
		loading,
		rounded = true,
		clamp = false,
		class: className,
		...rest
	} = $props();
</script>

<figure {...rest} class={['flex flex-col gap-xs', className]}>
	<ImageFrame as="div" {image} {aspect} {sizes} {loading} class={rounded && 'rounded-def'} />
	{#if image.caption}
		<figcaption class={['text-body', clamp ? 'text-trim-clipped line-clamp-2' : 'text-trim']}>
			{image.caption}
		</figcaption>
	{/if}
</figure>
