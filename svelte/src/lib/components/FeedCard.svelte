<script>
	import Card from '#lib/components/Card.svelte';
	import ResearchCard from '#lib/components/ResearchCard.svelte';
	import { formatDate } from '#lib/dates.js';
	import { formatWhen } from '#lib/events.js';

	/**
	 * One of the homepage's cards, large, in its type's colour: an event, a
	 * news post, or a research project, exhibition or course (queried with
	 * fetchCards). An event with no excerpt has its date instead.
	 */
	let { item } = $props();

	let card = $derived(
		{
			event: { tag: 'Event', class: 'bg-orange', meta: formatWhen(item.start, item.end) },
			news: { tag: 'News', class: 'bg-brown', meta: formatDate(item.date) }
		}[item._type]
	);
</script>

{#if card}
	<Card
		link={item.link}
		image={item.image}
		title={item.title}
		excerpt={item.excerpt || card.meta}
		large
		{...card}
	/>
{:else}
	<ResearchCard {item} large />
{/if}
