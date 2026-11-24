<script>
	import Section from '#lib/components/Section.svelte';
	import CardsModule from '#lib/components/modules/CardsModule.svelte';
	import ColumnsModule from '#lib/components/modules/ColumnsModule.svelte';
	import DetailsModule from '#lib/components/modules/DetailsModule.svelte';
	import GalleryModule from '#lib/components/modules/GalleryModule.svelte';
	import ImagesModule from '#lib/components/modules/ImagesModule.svelte';
	import OpportunitiesModule from '#lib/components/modules/OpportunitiesModule.svelte';
	import PeopleModule from '#lib/components/modules/PeopleModule.svelte';
	import QuoteModule from '#lib/components/modules/QuoteModule.svelte';
	import TextMediaModule from '#lib/components/modules/TextMediaModule.svelte';
	import TextModule from '#lib/components/modules/TextModule.svelte';
	import VideoModule from '#lib/components/modules/VideoModule.svelte';

	/**
	 * A page's modules (queried with modulesFields), each a Section with
	 * its heading, and `id` if it has one (see pageSections). Types not built
	 * yet are skipped. With `smallHeadings`, every heading is the small one
	 * over the paragraph column, as on research and exhibition pages.
	 */
	let { modules = [], smallHeadings = false } = $props();

	const components = {
		textModule: TextModule,
		textMediaModule: TextMediaModule,
		videoModule: VideoModule,
		galleryModule: GalleryModule,
		imagesModule: ImagesModule,
		peopleModule: PeopleModule,
		opportunitiesModule: OpportunitiesModule,
		columnsModule: ColumnsModule,
		quoteModule: QuoteModule,
		detailsModule: DetailsModule,
		cardsModule: CardsModule
	};

	// Sanity returns null for an empty field, which a module's defaults
	// (like no images) don't replace; left out, they do
	const filled = (module) =>
		Object.fromEntries(Object.entries(module).filter(([, value]) => value !== null));
</script>

{#each modules as module (module._key)}
	{@const Module = components[module._type]}
	{#if Module}
		<Section
			id={module.id}
			heading={module.heading}
			smallHeading={smallHeadings ? 'loose' : module.smallHeading && 'close'}
		>
			<Module {...filled(module)} />
		</Section>
	{/if}
{/each}
