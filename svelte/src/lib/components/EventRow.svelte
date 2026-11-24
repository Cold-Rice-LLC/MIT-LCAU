<script>
	import CardRow from '#lib/components/CardRow.svelte';
	import EventFacts from '#lib/components/EventFacts.svelte';
	import { formatWhen } from '#lib/events.js';

	/**
	 * An event as a CardRow on orange, with its type as the tag, its date
	 * and its location; on phones just the date (queried with eventCard).
	 */
	let { event } = $props();
</script>

<CardRow
	link={event.link}
	tag={event.type}
	image={event.image}
	title={event.title}
	meta={formatWhen(event.start, event.end)}
	class="bg-orange"
>
	<EventFacts {event} valueClass="lg:leading-[1.1] lg:tracking-[-0.02em]" />
</CardRow>
