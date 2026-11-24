<script>
	import RichText from '#lib/components/RichText.svelte';

	/**
	 * The headline, subtitle and intro at the top of a page, centred, and
	 * `children` under them, like buttons. Without a headline, the title is
	 * the page's h1 for screen readers alone. A subtitle has a little more
	 * room under it before the first module.
	 */
	let { title, headline, subtitle, intro, children } = $props();

	let shownSubtitle = $derived(headline && subtitle);
</script>

<header
	class={[
		'col-span-full page-top lg:grid lg:grid-cols-subgrid',
		shownSubtitle && !intro?.length && 'pb-xs lg:pb-md'
	]}
>
	<h1 class={headline ? 'col-span-full text-center text-h1 text-trim' : 'sr-only'}>
		{headline ?? title}
	</h1>
	{#if shownSubtitle}
		<p class="col-span-full mt-lg text-center text-body-lg text-trim lg:mt-xl">{shownSubtitle}</p>
	{/if}
	{#if intro?.length}
		<RichText
			value={intro}
			class={['text-h3 lg:col-span-7 lg:col-start-2', headline && 'mt-2xl lg:mt-[12rem]']}
		/>
	{/if}
	{@render children?.()}
</header>
