<script>
	import { page as currentPage } from '$app/state';
	import Pagination from '#lib/components/Pagination.svelte';
	import PersonCard from '#lib/components/PersonCard.svelte';
	import RefineControl from '#lib/components/RefineControl.svelte';
	import RefineRow from '#lib/components/RefineRow.svelte';
	import { queryHref, replaceQuery } from '#lib/url.js';

	let { data } = $props();

	const sorts = [
		{ label: 'Name A–Z,', descending: false },
		{ label: 'Name Z–A', descending: true }
	];

	// Changing who's shown starts again from the first page
	const href = (changes) => queryHref(currentPage.url, { page: null, ...changes });

	// Typing replaces the history entry rather than adding one per letter
	const search = (event) =>
		replaceQuery(currentPage.url, { page: null, q: event.currentTarget.value });
</script>

<h1 class="col-span-full pt-[6rem] pb-2xl text-center text-h1 text-trim lg:pt-3xl lg:pb-[12rem]">
	{data.headline}
</h1>

<!-- Announces how many match as the filter or search changes; screen
     readers skip what it says on load -->
<p role="status" class="sr-only">{data.total} {data.total === 1 ? 'person' : 'people'}</p>

<!-- A role at a time: choosing the current one again clears it -->
{#if data.roles.length}
	<RefineRow
		label="Role"
		as="nav"
		aria-label="Roles"
		class="col-span-full border-b-2 border-black/20 py-xs"
	>
		{#each data.roles as role (role._id)}
			{@const selected = role.slug === data.role}
			<RefineControl
				label={role.label}
				{selected}
				href={href({ role: selected ? null : role.slug })}
			/>
		{/each}
	</RefineRow>
{/if}

<div
	class="col-span-full flex flex-wrap items-center gap-x-md gap-y-xs border-b-2 border-black/20 py-xs"
>
	<div class="flex items-center gap-[1rem]">
		<p class="text-label text-trim">Sort</p>
		<div class="control-text flex gap-[1rem] button text-black/30">
			{#each sorts as sort (sort.label)}
				{@const current = sort.descending === data.descending}
				<a
					href={href({ sort: sort.descending ? 'desc' : null })}
					aria-current={current ? 'page' : undefined}
					class={['text-trim hover:text-black', current && 'text-black']}
				>
					{sort.label}
				</a>
			{/each}
		</div>
	</div>
	<form
		role="search"
		class="flex min-w-0 flex-1 basis-[30rem] items-center gap-[1rem]"
		onsubmit={(event) => event.preventDefault()}
	>
		<label for="people-search" class="text-label text-trim">Search</label>
		<input
			id="people-search"
			type="search"
			name="q"
			placeholder="Search name, or title"
			autocomplete="off"
			value={data.query}
			oninput={search}
			class="control-text"
		/>
	</form>
</div>

{#if data.people.length}
	<ul class="col-span-full mt-xl card-grid last:mb-xl">
		{#each data.people as person (person._id)}
			<li><PersonCard {person} /></li>
		{/each}
	</ul>
{:else}
	<p class="col-span-full my-xl text-body-lg">
		{data.query ? `No one matches “${data.query}”.` : 'No one yet.'}
	</p>
{/if}

<Pagination page={data.page} pageCount={data.pageCount} class="col-span-full my-xl" />

<style>
	@reference '../layout.css';

	/* Figma's D - Link type: set solid from lg */
	.control-text {
		@apply text-body-lg;

		@media (width >= 1024px) {
			line-height: 1;
			letter-spacing: -0.02em;
		}
	}

	input {
		flex: 1;
		min-width: 0;
		height: 3rem;
		padding-inline: var(--spacing-xs);
		border-radius: var(--radius-def);
		background-color: var(--color-ui);
		outline: none;

		&::placeholder {
			color: rgb(0 0 0 / 0.3);
		}

		&:focus-visible {
			outline: 2px solid var(--color-highlight);
		}

		@media (width >= 1024px) {
			height: 3.4rem;
		}
	}
</style>
