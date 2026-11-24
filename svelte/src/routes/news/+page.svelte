<script>
	import NewsCards from '#lib/components/NewsCards.svelte';
	import NewsRow from '#lib/components/NewsRow.svelte';
	import PageTitle from '#lib/components/PageTitle.svelte';
	import Pagination from '#lib/components/Pagination.svelte';
	import Section from '#lib/components/Section.svelte';

	let { data } = $props();
</script>

<PageTitle>{data.headline}</PageTitle>

{#if data.featured.length}
	<NewsCards posts={data.featured} />
{/if}

<Section heading="All News">
	{#if data.posts.length}
		<ul class="col-span-full flex flex-col gap-xs">
			{#each data.posts as post (post._id)}
				<li><NewsRow {post} /></li>
			{/each}
		</ul>
	{:else}
		<p class="col-span-full text-body-lg">No news yet.</p>
	{/if}
	<Pagination page={data.page} pageCount={data.pageCount} class="col-span-full mt-md lg:mt-0" />
</Section>
