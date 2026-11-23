<script>
	import RichText from '#lib/components/RichText.svelte';
	import Modules from '#lib/components/modules/Modules.svelte';

	let { data } = $props();
</script>

<!-- The headline and intro, centred; without a headline, the title is the
     page's h1 for screen readers alone -->
<header
	class="col-span-full flex flex-col gap-y-2xl pt-[6rem] lg:grid lg:grid-cols-subgrid lg:gap-y-[12rem] lg:pt-3xl"
>
	<h1 class={data.page.headline ? 'col-span-full text-center text-h1 text-trim' : 'sr-only'}>
		{data.page.headline ?? data.page.title}
	</h1>
	{#if data.page.intro?.length}
		<RichText value={data.page.intro} class="text-h3 lg:col-span-7 lg:col-start-2" />
	{/if}
</header>

<Modules modules={data.page.modules} />
