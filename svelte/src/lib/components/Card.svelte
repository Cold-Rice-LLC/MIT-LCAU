<script>
	import AppLink from '#lib/components/AppLink.svelte';
	import ImageFrame from '#lib/components/ImageFrame.svelte';
	import Tag from '#lib/components/Tag.svelte';

	/**
	 * Figma's D - Card - Box / M - Card - Box: a tag, an image (3:2 unless
	 * `aspect` says otherwise), a title of up to two lines and a line of
	 * `meta`, linking to `link`. The image multiplies into the card's
	 * colour, which `class` sets (bg-ui, bg-cool-gray…). `large` cards, three
	 * across from lg, have a larger title there, uncut, over the `excerpt`
	 * in place of the meta. `uncut`, the title's uncut on phones too, over
	 * three lines of the excerpt, and there's no grey frame without an image.
	 */
	let {
		link,
		tag,
		image,
		aspect = 3 / 2,
		title,
		meta,
		excerpt,
		large = false,
		uncut = false,
		class: className
	} = $props();
</script>

<AppLink
	{link}
	class={[
		'flex h-full flex-col gap-xs rounded-def px-[0.9rem] pt-[0.9rem] pb-xs lg:px-xs lg:pt-xs lg:pb-sm',
		className
	]}
>
	<Tag label={tag} />
	{#if image || !uncut}
		<ImageFrame
			as="span"
			{image}
			{aspect}
			sizes="(width >= 1024px) {large ? 27 : 20}vw, 50vw"
			class="mix-blend-multiply"
		/>
	{/if}
	<span class={['title', { large, uncut }]}>{title}</span>
	{#if meta}
		<span class={['text-body text-trim lg:leading-[1.3] lg:tracking-slight', large && 'lg:hidden']}>
			{meta}
		</span>
	{/if}
	{#if large && excerpt}
		<span class={['excerpt', { uncut }]}>{excerpt}</span>
	{/if}
</AppLink>

<style>
	@reference '../../routes/layout.css';

	/* Cut to two lines; a large card's is larger from lg, and uncut */
	.title {
		@apply trim-clamped line-clamp-2 text-body-lg;

		@media (width >= 1024px) {
			line-height: 1.1;
			letter-spacing: -0.02em;
		}

		&.large {
			@media (width >= 1024px) {
				@apply line-clamp-none text-h3 text-trim;
				margin-block: var(--spacing-2xs) 0;
				padding-top: 0;
			}
		}

		&.uncut {
			-webkit-line-clamp: none;
		}
	}

	/* From lg only, unless the card's uncut */
	.excerpt {
		@apply hidden text-body;
		line-height: 1.25;

		@media (width >= 1024px) {
			@apply block text-trim;
			margin-top: var(--spacing-xs);
			letter-spacing: var(--tracking-slight);
		}

		&.uncut {
			@apply text-trim-clipped line-clamp-3;

			@media (width >= 1024px) {
				@apply line-clamp-none text-trim;
				margin-top: var(--spacing-xs);
				padding-top: 0;
			}
		}
	}
</style>
