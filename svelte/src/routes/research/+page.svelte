<script>
	import CardColumns from '#lib/components/CardColumns.svelte';
	import PageIntro from '#lib/components/PageIntro.svelte';
	import ResearchCard from '#lib/components/ResearchCard.svelte';
	import Section from '#lib/components/Section.svelte';
	import { researchTypes } from '#lib/research.js';

	let { data } = $props();

	let sections = $derived(
		[
			{ type: researchTypes.research, items: data.research },
			{ type: researchTypes.exhibition, items: data.exhibitions },
			{ type: researchTypes.course, items: data.courses }
		].filter(({ items }) => items.length)
	);
</script>

<PageIntro headline={data.headline} intro={data.intro} note={data.note} links={data.links} />

{#each sections as { type, items } (type)}
	<Section heading="Recent {type.label}">
		<CardColumns {items}>
			{#snippet card(item)}<ResearchCard {item} large />{/snippet}
		</CardColumns>
		<a href="/research/all?type={type.value}" class="col-span-full block w-fit cta">
			Explore All {type.label}
		</a>
	</Section>
{/each}
