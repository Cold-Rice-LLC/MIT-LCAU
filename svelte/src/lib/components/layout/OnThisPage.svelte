<script>
	import OnThisPageLinks from '#lib/components/layout/OnThisPageLinks.svelte';

	/**
	 * Figma's D - Anchor Links: links to the page's sections in a grey panel,
	 * under the sidebar's logo. The links scroll when they're taller than
	 * their room, under the title.
	 */
	let { links, class: className } = $props();

	const id = $props.id();
</script>

<nav aria-labelledby={id} class={['flex flex-col rounded-def bg-ui p-xs', className]}>
	<h2 {id} class="mb-xs text-label text-trim">On this page</h2>
	<!-- Out to the panel's edges, so focus outlines aren't cut off -->
	<OnThisPageLinks
		{links}
		class="-mx-xs -mb-xs min-h-0 overflow-y-auto overscroll-contain px-xs pb-xs"
	/>
</nav>
