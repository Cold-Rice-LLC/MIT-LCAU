<script>
	import RichText from '#lib/components/RichText.svelte';
	import Modules from '#lib/components/modules/Modules.svelte';

	let { data } = $props();

	let { title, headline, intro, modules } = $derived(data.page);
	let subtitle = $derived(headline && data.page.subtitle);
</script>

<!-- The headline, subtitle and intro, centred; without a headline, the title
     is the page's h1 for screen readers alone. A subtitle has a little more
     room under it before the first module. -->
<header
	class={[
		'col-span-full pt-[6rem] lg:grid lg:grid-cols-subgrid lg:pt-3xl',
		subtitle && !intro?.length && 'pb-xs lg:pb-md'
	]}
>
	<h1 class={headline ? 'col-span-full text-center text-h1 text-trim' : 'sr-only'}>
		{headline ?? title}
	</h1>
	{#if subtitle}
		<p class="col-span-full mt-lg text-center text-body-lg text-trim lg:mt-xl">{subtitle}</p>
	{/if}
	{#if intro?.length}
		<RichText
			value={intro}
			class={['text-h3 lg:col-span-7 lg:col-start-2', headline && 'mt-2xl lg:mt-[12rem]']}
		/>
	{/if}
</header>

<Modules {modules} />
