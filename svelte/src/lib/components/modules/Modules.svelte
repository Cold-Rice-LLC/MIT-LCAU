<script>
	import Section from '#lib/components/Section.svelte';
	import ColumnsModule from '#lib/components/modules/ColumnsModule.svelte';
	import GalleryModule from '#lib/components/modules/GalleryModule.svelte';
	import OpportunitiesModule from '#lib/components/modules/OpportunitiesModule.svelte';
	import PeopleModule from '#lib/components/modules/PeopleModule.svelte';
	import TextMediaModule from '#lib/components/modules/TextMediaModule.svelte';
	import TextModule from '#lib/components/modules/TextModule.svelte';

	/**
	 * A page's modules (queried with modulesFields), each a Section with
	 * its heading. Types not built yet are skipped.
	 */
	let { modules = [] } = $props();

	const components = {
		textModule: TextModule,
		textMediaModule: TextMediaModule,
		galleryModule: GalleryModule,
		peopleModule: PeopleModule,
		opportunitiesModule: OpportunitiesModule,
		columnsModule: ColumnsModule
	};
</script>

{#each modules as module (module._key)}
	{@const Module = components[module._type]}
	{#if Module}
		<Section heading={module.heading}>
			<Module {...module} />
		</Section>
	{/if}
{/each}
