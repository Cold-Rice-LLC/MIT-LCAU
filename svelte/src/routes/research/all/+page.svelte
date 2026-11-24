<script>
	import PageTitle from '#lib/components/PageTitle.svelte';
	import Pagination from '#lib/components/Pagination.svelte';
	import RefineBar from '#lib/components/RefineBar.svelte';
	import ResearchCards from '#lib/components/ResearchCards.svelte';
	import ResearchRow from '#lib/components/ResearchRow.svelte';
	import { archiveLinks } from '#lib/archive.js';

	let { data } = $props();
</script>

<PageTitle>{data.headline}</PageTitle>

<RefineBar
	count="{data.total} {data.total === 1 ? 'result' : 'results'}"
	filter={{ label: 'Type', name: 'Types', param: 'type', ...data.filter }}
	dropdowns={data.dropdowns}
	links={archiveLinks(data)}
	query={data.query}
	placeholder="Search research, exhibitions, or courses"
/>

{#if data.items.length}
	{#if data.list}
		<ul class="col-span-full mt-xl flex flex-col gap-xs last:mb-xl">
			{#each data.items as item (item._id)}
				<li><ResearchRow {item} /></li>
			{/each}
		</ul>
	{:else}
		<ResearchCards items={data.items} class="mt-xl last:mb-xl" />
	{/if}
{:else}
	<p class="col-span-full my-xl text-body-lg">
		{data.query ? `Nothing matches “${data.query}”.` : 'Nothing matches these filters.'}
	</p>
{/if}

<Pagination page={data.page} pageCount={data.pageCount} class="col-span-full my-xl" />
