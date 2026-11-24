<script>
	import Fact from '#lib/components/Fact.svelte';
	import { formatWhen } from '#lib/events.js';

	/**
	 * An event's date and, if it has one, location, as Facts for a dl.
	 * Other props, like `valueClass`, go to both.
	 */
	let { event, ...rest } = $props();
</script>

<Fact label="Date" value={formatWhen(event.start, event.end)} {...rest} />
{#if event.location}
	<Fact label="Location" value={event.location} {...rest} />
{/if}
