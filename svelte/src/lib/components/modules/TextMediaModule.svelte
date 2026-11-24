<script>
	import Buttons from '#lib/components/Buttons.svelte';
	import Figure from '#lib/components/Figure.svelte';
	import RichText from '#lib/components/RichText.svelte';
	import VideoModule from '#lib/components/modules/VideoModule.svelte';
	import { croppedAspect } from '#lib/sanity/images.js';

	/**
	 * Text with images or a video: an image beside the text, each half the
	 * content, on the left or the right `side`; or the media above the text in
	 * the paragraph column. Above, one image is the middle 7 columns at its
	 * own shape, two split the content, and a video is all of it. Two images
	 * and videos always go above. Under the text, an optional note in purple
	 * and buttons, like an event's RSVP.
	 */
	let { heading, text, mediaType, images, video, layout, side, note, links } = $props();

	// Either kind of media may still be filled in when the other's chosen
	let shown = $derived(mediaType === 'video' ? [] : (images ?? []));
	let pair = $derived(shown.length === 2);
	let beside = $derived(layout !== 'above' && shown.length === 1);

	// Alone above the text, an image keeps its own shape
	const alone = (image) => ({
		aspect: croppedAspect(image),
		sizes: '(width >= 1024px) 63vw, 100vw',
		rounded: false,
		class: 'lg:col-span-7 lg:col-start-2'
	});
	const besideOrPair = $derived({
		sizes: '(width >= 1024px) 40vw, 100vw',
		class: beside && side === 'right' && 'lg:order-last'
	});
</script>

<div
	class={[
		'col-span-full grid gap-x-xs gap-y-lg',
		beside ? 'lg:grid-cols-2' : 'lg:gap-y-xl',
		pair && 'grid-cols-2',
		!beside && !pair && 'lg:grid-cols-subgrid'
	]}
>
	{#if mediaType === 'video'}
		<VideoModule {video} {heading} />
	{/if}
	{#each shown as image (image._key)}
		<Figure {image} {...beside || pair ? besideOrPair : alone(image)} />
	{/each}
	{#if text?.length || note || links?.length}
		<div class={['flex flex-col items-start gap-lg', !beside && 'col-span-full measure']}>
			{#if text?.length}
				<RichText value={text} class="text-body-lg" />
			{/if}
			<Buttons {note} {links} />
		</div>
	{/if}
</div>
