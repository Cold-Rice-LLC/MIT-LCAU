<script>
	import ImageCard from '#lib/components/ImageCard.svelte';
	import ImageCards from '#lib/components/ImageCards.svelte';
	import { formatDate } from '#lib/dates.js';

	/**
	 * News posts three across, as in Featured and More News, each with its
	 * date (queried with newsCard); stacked on phones.
	 */
	let { posts } = $props();
</script>

<ImageCards items={posts}>
	{#snippet card({ link, image, title, date })}
		<ImageCard {link} tag="News" {image} {title} meta={formatDate(date)} />
	{/snippet}
</ImageCards>
