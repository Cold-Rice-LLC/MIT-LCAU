<script>
	import Buttons from '#lib/components/Buttons.svelte';
	import ImageCard from '#lib/components/ImageCard.svelte';
	import ImageCards from '#lib/components/ImageCards.svelte';

	/** Case studies three across, with any note and buttons below. */
	let { caseStudies = [], note, links } = $props();
</script>

{#if caseStudies.length}
	<ImageCards items={caseStudies}>
		{#snippet card({ link, image, title, partner })}
			<ImageCard {link} {image} {title} meta={partner} />
		{/snippet}
	</ImageCards>
{/if}
<Buttons {note} {links} class="col-span-full" />
