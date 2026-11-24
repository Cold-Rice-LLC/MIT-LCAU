<script>
	import AppLink from '#lib/components/AppLink.svelte';
	import Figure from '#lib/components/Figure.svelte';
	import RichText from '#lib/components/RichText.svelte';
	import { isExternalLink } from '#lib/sanity/links.js';

	/**
	 * Text and images: an image beside the text, each half the content, or
	 * the images (one or two side by side) above the text in the paragraph
	 * column. Two images always go above. Under the text, an optional note
	 * in purple and buttons, like an event's RSVP. Videos aren't built yet.
	 */
	let { text, images = [], layout, note, links } = $props();

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
	{#if text?.length || note || links?.length}
		<div class={['flex flex-col items-start gap-lg', !beside && 'col-span-full measure']}>
			{#if text?.length}
				<RichText value={text} class="text-body-lg" />
			{/if}
			{#if note}
				<p class="text-body-lg text-highlight text-trim">{note}</p>
			{/if}
			{#if links?.length}
				<!-- 18px under the note, as in Figma -->
				<div class="flex flex-wrap gap-xs [p+&]:-mt-sm">
					{#each links as link (link._key)}
						<AppLink {link} class="cta">
							{link.label}
							{#if isExternalLink(link)}<span aria-hidden="true">↗</span>{/if}
						</AppLink>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</div>
