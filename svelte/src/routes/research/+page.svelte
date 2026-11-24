<script>
	import Buttons from '#lib/components/Buttons.svelte';
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

	// Every third item, for each of three columns, with its place among them all
	const columns = (items) =>
		[0, 1, 2].map((column) =>
			items.map((item, i) => ({ item, i })).filter(({ i }) => i % 3 === column)
		);
</script>

<PageIntro headline={data.headline} intro={data.intro}>
	<Buttons
		note={data.note}
		links={data.links}
		class="mt-lg lg:col-span-7 lg:col-start-2 lg:mt-xl"
	/>
</PageIntro>

{#each sections as { type, items } (type)}
	<Section heading="Recent {type.label}">
		<!-- From lg, three columns that each stack their own cards, so they're
		     as tall as they need; on phones the columns drop away and the cards
		     go two across, in their order -->
		<div class="col-span-full card-grid lg:grid-cols-3">
			{#each columns(items) as column, n (n)}
				<ul class="contents lg:flex lg:flex-col lg:gap-xs">
					{#each column as { item, i } (item._id)}
						<li style:order={i}><ResearchCard {item} large /></li>
					{/each}
				</ul>
			{/each}
		</div>
		<a href="/research/all?type={type.value}" class="col-span-full block w-fit cta">
			Explore All {type.label}
		</a>
	</Section>
{/each}
