<script>
	import AppLink from '#lib/components/AppLink.svelte';
	import EventCard from '#lib/components/EventCard.svelte';
	import EventFacts from '#lib/components/EventFacts.svelte';
	import Fact from '#lib/components/Fact.svelte';
	import Section from '#lib/components/Section.svelte';
	import Tag from '#lib/components/Tag.svelte';
	import Modules from '#lib/components/modules/Modules.svelte';

	let { data } = $props();

	let event = $derived(data.event);

	let attendance = $derived(data.ended ? 'This event has ended.' : event.attendance);

	// The RSVP URL as a link value, so AppLink opens it in a new tab
	let rsvpLink = $derived(
		!data.ended && event.rsvpUrl && { linkType: 'external', externalUrl: event.rsvpUrl }
	);
</script>

<!-- The title and subtitle, and the facts four across below them (two on
     phones) -->
<header class="col-span-full end-gap pt-[6rem] lg:pt-3xl">
	<h1 class="text-center text-h1 text-trim">{event.title}</h1>
	{#if event.subtitle}
		<p class="mt-md text-center text-h3 text-trim lg:mt-xl">{event.subtitle}</p>
	{/if}
	<dl class="mt-2xl grid grid-cols-2 gap-x-xs gap-y-lg lg:grid-cols-4">
		<Fact label="Type">
			<dd class="flex flex-col gap-xs">
				<Tag label={event.type} />
				{#if !data.ended}
					<Tag label="Upcoming" class="text-upcoming" />
				{/if}
			</dd>
		</Fact>
		<EventFacts {event} valueClass="lg:leading-[1.1]" />
		{#if attendance || rsvpLink}
			<Fact label="Attendance" value={attendance} valueClass="lg:leading-[1.1]">
				{#if rsvpLink}
					<dd class="flex">
						<AppLink link={rsvpLink} class="cta">RSVP <span aria-hidden="true">↗</span></AppLink>
					</dd>
				{/if}
			</Fact>
		{/if}
	</dl>
</header>

<Modules modules={event.modules} />

{#if event.related?.length}
	<Section heading="Related Events">
		<ul class="col-span-full card-grid">
			{#each event.related as related (related._id)}
				<li><EventCard event={related} /></li>
			{/each}
		</ul>
	</Section>
{/if}
