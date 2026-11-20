<script>
	import Image from '#lib/components/Image.svelte';

	/**
	 * A grey frame the image covers, cropped to fit, so there's something in
	 * its place while it loads. With an `aspect` (width / height) the frame
	 * takes that ratio and the image files are cropped to it; otherwise
	 * `class` sizes it. Without an image the grey frame holds its place.
	 * `as="span"` suits phrasing content, like inside a button. `sizes` and
	 * `loading` pass to Image, and `loaded` binds to it.
	 */
	let {
		image,
		aspect,
		sizes,
		loading,
		loaded = $bindable(false),
		as = 'figure',
		class: className
	} = $props();
</script>

<svelte:element
	this={as}
	class={['overflow-hidden bg-neutral-100', as === 'span' && 'block', className]}
	style:aspect-ratio={aspect}
>
	{#if image?.asset}
		<Image {image} {aspect} {sizes} {loading} bind:loaded class="size-full object-cover" />
	{/if}
</svelte:element>
