<script>
	import AppLink from '#lib/components/AppLink.svelte';
	import ImageFrame from '#lib/components/ImageFrame.svelte';
	import Tag from '#lib/components/Tag.svelte';

	/**
	 * Figma's D - Card - List, a card as a row linking to `link`: a 3:2 image
	 * that multiplies into the row's colour (which `class` sets, as on Card),
	 * a tag and a title of up to two lines, then, from lg, the Facts passed as
	 * children in two `columns` (or three), never too narrow for
	 * "Announcement". With an `excerpt`, rows from lg are all the same height:
	 * it's cut to three lines under a one-line title, one under two.
	 *
	 * On phones the image sits beside the title, with `meta` under it in
	 * place of the Facts; `stacked` puts the image above the whole title and
	 * the Facts instead, without the tag (M - Card - Box).
	 */
	let {
		link,
		tag,
		image,
		title,
		excerpt,
		meta,
		stacked = false,
		columns = 2,
		class: className,
		children
	} = $props();

	let titleLines = $state(2);

	const measureTitle = (el) => {
		const observer = new ResizeObserver(() => {
			const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
			titleLines = el.offsetHeight < lineHeight * 1.5 ? 1 : 2;
		});
		observer.observe(el);
		return () => observer.disconnect();
	};
</script>

<AppLink
	{link}
	class={[
		'grid gap-xs rounded-def lg:grid-cols-[209fr_691fr_minmax(28.8rem,444fr)] lg:p-xs',
		stacked ? 'p-xs pb-sm' : 'grid-cols-[minmax(0,1fr)_minmax(0,2fr)] p-[0.9rem]',
		className
	]}
>
	<ImageFrame
		as="span"
		{image}
		aspect={3 / 2}
		sizes="(width >= 1024px) 15vw, {stacked ? '100vw' : '33vw'}"
		class="mix-blend-multiply"
	/>
	<span class={['flex min-w-0 flex-col gap-xs lg:gap-md', excerpt && 'lg:h-[13.9rem]']}>
		<Tag label={tag} class={['lg:-mb-2xs', stacked && 'hidden lg:flex']} />
		<span
			class={[
				'trim-clamped',
				stacked ? 'text-h3 lg:line-clamp-2' : 'line-clamp-2 text-body-lg lg:text-h3'
			]}
			{@attach excerpt && measureTitle}
		>
			{title}
		</span>
		{#if meta}
			<span class="mt-2xs text-body text-trim lg:hidden">{meta}</span>
		{/if}
		{#if excerpt}
			<span
				class={[
					'text-trim-clipped hidden text-body',
					titleLines === 1 ? 'lg:line-clamp-3' : 'lg:line-clamp-1'
				]}
			>
				{excerpt}
			</span>
		{/if}
	</span>
	<dl
		class={[
			'grid-cols-2 gap-xs lg:mt-0 lg:grid',
			columns === 3 && 'lg:grid-cols-3',
			stacked ? 'mt-xs grid' : 'hidden'
		]}
	>
		{@render children()}
	</dl>
</AppLink>

<style>
	/* The Facts' values, set closer from lg */
	dl :global(dd) {
		@media (width >= 1024px) {
			line-height: 1.1;
			letter-spacing: -0.02em;
		}
	}
</style>
