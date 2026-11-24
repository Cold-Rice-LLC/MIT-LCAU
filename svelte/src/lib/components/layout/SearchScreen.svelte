<script>
	import PageTitle from '#lib/components/PageTitle.svelte';
	import Pagination from '#lib/components/Pagination.svelte';
	import SearchInput from '#lib/components/SearchInput.svelte';
	import SearchResult from '#lib/components/SearchResult.svelte';
	import CloseIcon from '#lib/components/icons/CloseLarge.svelte';
	import Sidebar from '#lib/components/layout/Sidebar.svelte';
	import { searchTitle } from '#lib/search.js';

	/**
	 * Figma's D - Search Results Overlay: the search bar, stuck to the top,
	 * over the results of a `search` (see searchSite), beside the sidebar.
	 * The × calls `onclose`.
	 */
	let { search, onclose } = $props();

	// Reset by each search, and typed over
	let query = $derived(search.query);
</script>

<div class="shell">
	<Sidebar />
	<div class="min-w-0 px-xs lg:col-start-2 lg:row-start-1">
		<div class="sticky top-0 z-10 flex gap-xs py-xs text-white">
			<form
				action="/search"
				role="search"
				class="flex min-w-0 flex-1 items-center gap-sm rounded-def bg-highlight px-sm py-xs"
			>
				<SearchInput bind:value={query} />
			</form>
			<button
				type="button"
				aria-label="Close search"
				class="rounded-def bg-highlight"
				onclick={onclose}
			>
				<CloseIcon class="w-[7.4rem]" />
			</button>
		</div>
		<main class="pt-xs pb-[6rem]">
			<PageTitle>{searchTitle(search.query)}</PageTitle>
			{#if search.results.length}
				<ul class="flex flex-col gap-md">
					{#each search.results as item (item._id)}
						<li><SearchResult {item} /></li>
					{/each}
				</ul>
			{:else if search.query}
				<p class="text-center text-body-lg">Nothing matches “{search.query}”.</p>
			{/if}
			<Pagination page={search.page} pageCount={search.pageCount} class="mt-xl" />
		</main>
	</div>
</div>
