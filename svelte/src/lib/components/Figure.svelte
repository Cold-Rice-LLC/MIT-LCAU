<script>
	import ImageFrame from '#lib/components/ImageFrame.svelte';
	import ExpandIcon from '#lib/components/icons/Expand.svelte';

	/**
	 * A figure image (3:2 and rounded by default) with its caption below.
	 * `clamp` cuts the caption to two lines, as in a carousel; other
	 * attributes, like `class`, go on the figure. With `onopen`, the image is
	 * a button that calls it, as to open a Lightbox, left out of the tab order
	 * unless `focusable`; `expandIcon` shows an icon on it when it's hovered.
	 */
	let {
		image,
		aspect = 3 / 2,
		sizes,
		loading,
		rounded = true,
		clamp = false,
		onopen,
		focusable = true,
		expandIcon = false,
		class: className,
		...rest
	} = $props();
</script>

{#snippet frame(as)}
	<ImageFrame {as} {image} {aspect} {sizes} {loading} class={rounded && 'rounded-def'} />
{/snippet}

<figure {...rest} class={['flex flex-col gap-xs', className]}>
	{#if onopen}
		<button
			type="button"
			aria-label={['View larger', image.caption].filter(Boolean).join(': ')}
			tabindex={focusable ? undefined : -1}
			class="relative w-full cursor-zoom-in"
			onclick={onopen}
		>
			{@render frame('span')}
			{#if expandIcon}
				<span class="expand">
					<ExpandIcon class="size-[1.8rem]" />
				</span>
			{/if}
		</button>
	{:else}
		{@render frame('div')}
	{/if}
	{#if image.caption}
		<figcaption class={['text-body', clamp ? 'text-trim-clipped line-clamp-2' : 'text-trim']}>
			{image.caption}
		</figcaption>
	{/if}
</figure>

<style>
	/* Figma's D - Lightbox - Image, hovered: white on a charcoal square */
	.expand {
		position: absolute;
		top: var(--spacing-xs);
		right: var(--spacing-xs);
		padding: var(--spacing-2xs);
		border-radius: var(--radius-def);
		background-color: var(--color-charcoal);
		color: var(--color-white);
		filter: drop-shadow(0 0 0.25rem rgb(0 0 0 / 0.3));
		opacity: 0;
		transition: opacity 300ms var(--default-transition-timing-function);

		button:is(:hover, :focus-visible) > & {
			opacity: 1;
		}
	}
</style>
