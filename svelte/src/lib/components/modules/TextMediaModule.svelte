<script>
	import Figure from '#lib/components/Figure.svelte';
	import RichText from '#lib/components/RichText.svelte';

	/**
	 * Text and images: an image beside the text, each half the content, or
	 * the images (one or two side by side) above the text in the paragraph
	 * column. Two images always go above. Videos aren't built yet.
	 */
	let { text, images = [], layout } = $props();

	let pair = $derived(images.length === 2);
	let beside = $derived(layout !== 'above' && images.length === 1);
</script>

<div
	class={[
		'col-span-full grid gap-x-xs gap-y-lg',
		beside ? 'lg:grid-cols-2' : 'lg:gap-y-xl',
		pair && 'grid-cols-2'
	]}
>
	{#each images as image (image._key)}
		<Figure {image} sizes={beside || pair ? '(width >= 1024px) 40vw, 100vw' : '80vw'} />
	{/each}
	{#if text?.length}
		<RichText value={text} class={['text-body-lg', !beside && 'col-span-full measure']} />
	{/if}
</div>
