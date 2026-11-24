<script>
	import AppLink from '#lib/components/AppLink.svelte';
	import ImageFrame from '#lib/components/ImageFrame.svelte';
	import Tag from '#lib/components/Tag.svelte';

	/**
	 * An unboxed card, like a news post's: any tag (from lg), a 3:2 image, a
	 * title and a line of `meta`, linking to `link`.
	 */
	let { link, tag, image, title, meta } = $props();
</script>

<AppLink {link} class="flex flex-col">
	<Tag label={tag} class="hidden lg:mb-xs lg:flex" />
	<ImageFrame
		as="span"
		{image}
		aspect={3 / 2}
		sizes="(width >= 1024px) 27vw, 100vw"
		class="rounded-def"
	/>
	<span class="mt-xs text-h3 text-trim lg:mt-sm">{title}</span>
	{#if meta}
		<span class="mt-sm text-body-lg text-trim lg:mt-md lg:leading-[1.1]">{meta}</span>
	{/if}
</AppLink>
