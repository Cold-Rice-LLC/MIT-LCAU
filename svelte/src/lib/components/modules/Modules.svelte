<script>
	import ColumnsModule from '#lib/components/modules/ColumnsModule.svelte';
	import GalleryModule from '#lib/components/modules/GalleryModule.svelte';
	import OpportunitiesModule from '#lib/components/modules/OpportunitiesModule.svelte';
	import PeopleModule from '#lib/components/modules/PeopleModule.svelte';
	import TextMediaModule from '#lib/components/modules/TextMediaModule.svelte';
	import TextModule from '#lib/components/modules/TextModule.svelte';

	/**
	 * A page's modules (queried with modulesFields), each a section with
	 * its heading centred above it. From lg each section spans the page's
	 * 9 columns as a subgrid, so a module places itself in them, like the
	 * middle 7. Row gaps only, so the subgrid keeps the page's column gap.
	 * Types not built yet are skipped.
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
		<section
			class="col-span-full mt-2xl flex flex-col gap-y-lg last:mb-xl lg:mt-3xl lg:grid lg:grid-cols-subgrid lg:gap-y-xl lg:last:mb-3xl"
		>
			{#if module.heading}
				<h2 class="col-span-full text-center text-h2 text-trim">{module.heading}</h2>
			{/if}
			<Module {...module} />
		</section>
	{/if}
{/each}
