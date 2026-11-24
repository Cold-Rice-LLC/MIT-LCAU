<script>
	import { page } from '$app/state';
	import RefineControl from '#lib/components/RefineControl.svelte';
	import RefineDropdown from '#lib/components/RefineDropdown.svelte';
	import RefineLinks from '#lib/components/RefineLinks.svelte';
	import RefineRow from '#lib/components/RefineRow.svelte';
	import SearchField from '#lib/components/SearchField.svelte';
	import Close from '#lib/components/icons/Close.svelte';
	import { refineHref } from '#lib/url.js';

	/**
	 * What filters, sorts and searches a landing page's list, by its URL: a
	 * row of filters, then a row of `links` (see RefineLinks) and the search
	 * field. `filter` shows its options as buttons, one at a time; it's
	 * `{ label, name, param, options, value }`, its options are
	 * `{ label, value }`, with `value` the chosen one's, and `name` is for
	 * screen readers. `dropdowns` are more filters, the same but for `name`,
	 * which open their options instead (see RefineDropdown); what's chosen in
	 * them shows under Selected, where clicking it clears it. `count` is how
	 * many match, like "8 people".
	 */
	let { count, filter, dropdowns = [], links, query, placeholder } = $props();

	let openable = $derived(dropdowns.filter(({ options }) => options.length));
	let chosen = $derived(
		openable.flatMap(({ param, options, value }) =>
			options.filter((option) => option.value === value).map(({ label }) => ({ param, label }))
		)
	);
</script>

<!-- Announces how many match as the filter or search changes; screen
     readers skip what it says on load -->
<p role="status" class="sr-only">{count}</p>

<!-- Choosing the current one again clears it -->
{#if filter.options.length || openable.length}
	<div class="row relative z-10">
		{#if filter.options.length}
			<RefineRow label={filter.label} as="nav" aria-label={filter.name} class="min-w-0">
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
		{#if openable.length}
			<div class="flex flex-wrap items-center gap-2xs lg:gap-[1rem]">
				<p class="text-label text-trim">Filters</p>
				{#each openable as dropdown (dropdown.param)}
					<RefineDropdown {...dropdown} />
				{/each}
			</div>
		{/if}
		{#if chosen.length}
			<div class="flex flex-wrap items-center gap-[1rem]">
				<p class="text-label text-trim">Selected</p>
				{#each chosen as { param, label } (param)}
					<a
						href={refineHref(page.url, { [param]: null })}
						aria-label="Remove {label}"
						class="flex items-center gap-[0.8rem] button bg-highlight text-control text-white"
					>
						<Close class="size-[1.4rem] opacity-50" />
						<span class="text-trim">{label}</span>
					</a>
				{/each}
			</div>
		{/if}
	</div>
{/if}

<div class="row">
	{#each links as group (group.param)}
		<RefineLinks {...group} />
	{/each}
	<SearchField {placeholder} value={query} />
</div>

<style>
	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--spacing-xs) var(--spacing-md);
		grid-column: 1 / -1;
		padding-block: var(--spacing-xs);
		border-bottom: 2px solid rgb(0 0 0 / 0.2);
	}
</style>
