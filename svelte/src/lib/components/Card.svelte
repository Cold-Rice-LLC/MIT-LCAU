<script>
	import AppLink from '#lib/components/AppLink.svelte';
	import ImageFrame from '#lib/components/ImageFrame.svelte';
	import Tag from '#lib/components/Tag.svelte';

	/**
	 * Figma's D - Card - Box / M - Card - Box: a tag, an image (3:2 unless
	 * `aspect` says otherwise), a title of up to two lines and a line of
	 * `meta`, linking to `link`. The image multiplies into the card's
	 * colour, which `class` sets (bg-ui, bg-cool-gray…).
	 */
	let { link, tag, image, aspect = 3 / 2, title, meta, class: className } = $props();
</script>

<AppLink
	{link}
	class={[
		'flex h-full flex-col gap-xs rounded-def px-[0.9rem] pt-[0.9rem] pb-xs lg:px-xs lg:pt-xs lg:pb-sm',
		className
	]}
>
	<Tag label={tag} />
	<ImageFrame
		as="span"
		{image}
		{aspect}
		sizes="(width >= 1024px) 25vw, 50vw"
		class="mix-blend-multiply"
	/>
	<span class="trim-clamped line-clamp-2 text-body-lg lg:leading-[1.1] lg:tracking-[-0.02em]">
		{title}
	</span>
	{#if meta}
		<span class="text-body text-trim lg:leading-[1.3] lg:tracking-slight">{meta}</span>
	{/if}
</AppLink>
