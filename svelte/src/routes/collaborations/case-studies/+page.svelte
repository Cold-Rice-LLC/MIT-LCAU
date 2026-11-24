<script>
	import PageIntro from '#lib/components/PageIntro.svelte';
	import Section from '#lib/components/Section.svelte';
	import Modules from '#lib/components/modules/Modules.svelte';
	import TextMediaModule from '#lib/components/modules/TextMediaModule.svelte';

	let { data } = $props();
</script>

<PageIntro {...data.page} />

<Modules modules={data.page.modules} />

{#each data.page.caseStudies as { id, partner, image, text } (id)}
	<Section {id} heading={partner}>
		<TextMediaModule {text} images={image?.asset ? [image] : []} />
	</Section>
{/each}
