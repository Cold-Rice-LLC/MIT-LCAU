<script>
	import { page } from '$app/state';
	import RefineControl from '#lib/components/RefineControl.svelte';
	import RefineLinks from '#lib/components/RefineLinks.svelte';
	import RefineRow from '#lib/components/RefineRow.svelte';
	import SearchField from '#lib/components/SearchField.svelte';
	import { refineHref } from '#lib/url.js';

	/**
	 * What filters, sorts and searches a landing page's list, by its URL: a
	 * row of filters one at a time, then a row of `links` (see RefineLinks)
	 * and the search field. `filter` is `{ label, name, param, options,
	 * value }`: its options are `{ label, value }`, with `value` the chosen
	 * one's, and `name` is for screen readers. `count` is how many match,
	 * like "8 people".
	 */
	let { count, filter, links, query, placeholder } = $props();
</script>

<!-- Announces how many match as the filter or search changes; screen
     readers skip what it says on load -->
<p role="status" class="sr-only">{count}</p>

<!-- Choosing the current one again clears it -->
{#if filter.options.length}
	<RefineRow
		label={filter.label}
		as="nav"
		aria-label={filter.name}
		class="col-span-full border-b-2 border-black/20 py-xs"
	>
		{#each filter.options as { label, value }, i (i)}
			{@const selected = value === filter.value}
			<RefineControl
				{label}
				{selected}
				href={refineHref(page.url, { [filter.param]: selected ? null : value })}
			/>
		{/each}
	</RefineRow>
{/if}

<div
	class="col-span-full flex flex-wrap items-center gap-x-md gap-y-xs border-b-2 border-black/20 py-xs"
>
	{#each links as group (group.param)}
		<RefineLinks {...group} />
	{/each}
	<SearchField {placeholder} value={query} />
</div>
