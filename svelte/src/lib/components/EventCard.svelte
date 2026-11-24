<script>
	import Card from '#lib/components/Card.svelte';
	import { formatWhen } from '#lib/events.js';

	/**
	 * An event's Card: its type as the tag, its image, title and when it
	 * is, on orange (queried with eventCard).
	 */
	let { event } = $props();
</script>

<Card
	link={event.link}
	tag={event.type}
	image={event.image}
	title={event.title}
	meta={formatWhen(event.start, event.end)}
	class="bg-orange"
/>
