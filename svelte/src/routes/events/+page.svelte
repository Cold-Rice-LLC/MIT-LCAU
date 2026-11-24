<script>
	import AppLink from '#lib/components/AppLink.svelte';
	import EventCalendar from '#lib/components/EventCalendar.svelte';
	import EventCard from '#lib/components/EventCard.svelte';
	import PageTitle from '#lib/components/PageTitle.svelte';
	import Section from '#lib/components/Section.svelte';
	import UpcomingEventCard from '#lib/components/UpcomingEventCard.svelte';

	let { data } = $props();
</script>

{#snippet seeAll(className)}
	{#if data.archive}
		<AppLink link={data.archive} class={['col-span-full block w-fit cta', className]}>
			See All Events
		</AppLink>
	{/if}
{/snippet}

<PageTitle>{data.headline}</PageTitle>

<EventCalendar days={data.days} today={data.today} class="col-span-full mx-auto" />

{#if data.upcoming.length}
	<ul class="col-span-full mt-xl grid gap-x-xs gap-y-lg lg:grid-cols-2 lg:gap-y-3xl">
		{#each data.upcoming as event (event._id)}
			<li><UpcomingEventCard {event} /></li>
		{/each}
	</ul>
{:else}
	<p class="col-span-full mt-xl text-body-lg">No upcoming events yet.</p>
{/if}

{@render seeAll('mt-xl')}

{#if data.past.length}
	<Section heading="Past Events">
		<ul class="col-span-full card-grid">
			{#each data.past as event (event._id)}
				<li><EventCard {event} /></li>
			{/each}
		</ul>
		{@render seeAll()}
	</Section>
{/if}
