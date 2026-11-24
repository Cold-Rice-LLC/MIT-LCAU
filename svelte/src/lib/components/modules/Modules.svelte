<script>
	import Section from '#lib/components/Section.svelte';
	import ColumnsModule from '#lib/components/modules/ColumnsModule.svelte';
	import GalleryModule from '#lib/components/modules/GalleryModule.svelte';
	import ImagesModule from '#lib/components/modules/ImagesModule.svelte';
	import OpportunitiesModule from '#lib/components/modules/OpportunitiesModule.svelte';
	import PeopleModule from '#lib/components/modules/PeopleModule.svelte';
	import TextMediaModule from '#lib/components/modules/TextMediaModule.svelte';
	import TextModule from '#lib/components/modules/TextModule.svelte';
	import VideoModule from '#lib/components/modules/VideoModule.svelte';

	/**
	 * A page's modules (queried with modulesFields), each a Section with
	 * its heading. Types not built yet are skipped.
	 */
	let { modules = [] } = $props();

	const components = {
		textModule: TextModule,
		textMediaModule: TextMediaModule,
		videoModule: VideoModule,
		galleryModule: GalleryModule,
		imagesModule: ImagesModule,
		peopleModule: PeopleModule,
		opportunitiesModule: OpportunitiesModule,
		columnsModule: ColumnsModule
	};

	// Sanity returns null for an empty field, which a module's defaults
	// (like no images) don't replace; left out, they do
	const filled = (module) =>
		Object.fromEntries(Object.entries(module).filter(([, value]) => value !== null));
</script>

{#each modules as module (module._key)}
	{@const Module = components[module._type]}
	{#if Module}
		<Section heading={module.heading}>
			<Module {...filled(module)} />
		</Section>
	{/if}
{/each}
