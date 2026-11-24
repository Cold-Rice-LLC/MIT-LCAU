<script>
	import { page } from '$app/state';
	import EventRow from '#lib/components/EventRow.svelte';
	import NewsRow from '#lib/components/NewsRow.svelte';
	import PageRow from '#lib/components/PageRow.svelte';
	import ResearchRow from '#lib/components/ResearchRow.svelte';
	import { crumbsTo } from '#lib/navigation.js';
	import { researchTypes } from '#lib/research.js';

	/** A search result: its breadcrumb, as in the menu, over its row, in its type's colour. */
	let { item } = $props();

	let crumbs = $derived(crumbsTo(page.data.navigation, item));
</script>

<p class="mb-xs text-body-lg text-trim lg:leading-none">
	{crumbs.above.map((crumb) => `${crumb} → `).join('')}<span class="text-highlight"
		>{crumbs.here}</span
	>
</p>
{#if item._type === 'event'}
	<EventRow event={item} />
{:else if item._type === 'news'}
	<NewsRow post={item} />
{:else if item._type in researchTypes}
	<ResearchRow {item} />
{:else}
	<PageRow {item} />
{/if}
