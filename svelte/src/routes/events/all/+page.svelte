<script>
	import EventCard from '#lib/components/EventCard.svelte';
	import EventRow from '#lib/components/EventRow.svelte';
	import PageTitle from '#lib/components/PageTitle.svelte';
	import Pagination from '#lib/components/Pagination.svelte';
	import RefineBar from '#lib/components/RefineBar.svelte';
	import { archiveLinks } from '#lib/archive.js';

	let { data } = $props();

	let Item = $derived(data.list ? EventRow : EventCard);
</script>

<PageTitle>{data.headline}</PageTitle>

<RefineBar
	count="{data.total} {data.total === 1 ? 'event' : 'events'}"
	filter={{
		label: 'Type',
		name: 'Event types',
		param: 'type',
		options: data.types,
		value: data.type
	}}
	links={archiveLinks(data)}
	query={data.query}
	placeholder="Search events"
/>

{#if data.groups.length}
	<div class="col-span-full mt-xl end-gap flex flex-col gap-2xl lg:gap-3xl">
		{#each data.groups as group (group.heading)}
			<section class="flex flex-col gap-lg lg:gap-xl">
				{#if group.heading}
					<h2 class="text-center text-h2 text-trim">{group.heading}</h2>
				{/if}
				<ul class={data.list ? 'flex flex-col gap-xs' : 'card-grid'}>
					{#each group.events as event (event._id)}
						<li><Item {event} /></li>
					{/each}
				</ul>
			</section>
		{/each}
	</div>
{:else}
	<p class="col-span-full my-xl text-body-lg">
		{data.query ? `No events match “${data.query}”.` : 'No events yet.'}
	</p>
{/if}

<Pagination
	page={data.page}
	pageCount={data.pageCount}
	class="col-span-full mt-2xl mb-xl lg:mt-3xl"
/>
