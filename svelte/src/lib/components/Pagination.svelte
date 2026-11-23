<script>
	import { page as currentPage } from '$app/state';
	import { queryHref } from '#lib/url.js';

	/**
	 * Previous, the page numbers and Next, as grey buttons, the current page
	 * in purple; Previous and Next are greyed out at either end. With more
	 * than seven pages, the first, the last and those around the current
	 * one show, with gaps between. Each is a link to its `?page=`. On phones
	 * the numbers are a row of their own above Previous and Next.
	 */
	let { page, pageCount, class: className } = $props();

	const href = (number) => queryHref(currentPage.url, { page: number > 1 ? number : null });

	// Seven at most: the numbers to show, null for each gap
	let numbers = $derived.by(() => {
		const range = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => from + i);
		if (pageCount <= 7) return range(1, pageCount);
		if (page <= 4) return [...range(1, 5), null, pageCount];
		if (page >= pageCount - 3) return [1, null, ...range(pageCount - 4, pageCount)];
		return [1, null, page - 1, page, page + 1, null, pageCount];
	});
</script>

{#snippet step(number, label)}
	{#if number >= 1 && number <= pageCount}
		<a href={href(number)} class="page-button">{label}</a>
	{:else}
		<span aria-hidden="true" class="page-button text-black/40">{label}</span>
	{/if}
{/snippet}

{#if pageCount > 1}
	<nav
		aria-label="Pages"
		class={['grid grid-cols-2 gap-xs text-body lg:grid-cols-3 lg:leading-[1.1]', className]}
	>
		{@render step(page - 1, '← Previous')}
		<ol class="-order-1 col-span-full flex gap-xs lg:order-none lg:col-span-1">
			{#each numbers as number, i (number ?? `gap-${i}`)}
				<li class="flex flex-1">
					{#if number === null}
						<span class="page-button">…</span>
					{:else}
						<a
							href={href(number)}
							aria-current={number === page ? 'page' : undefined}
							aria-label="Page {number}"
							class="page-button"
						>
							{number}
						</a>
					{/if}
				</li>
			{/each}
		</ol>
		{@render step(page + 1, 'Next →')}
	</nav>
{/if}

<style>
	@reference '../../routes/layout.css';

	.page-button {
		@apply button text-trim;
		flex: 1;
		text-align: center;

		&[aria-current='page'] {
			background-color: var(--color-highlight);
			color: var(--color-white);
		}
	}
</style>
