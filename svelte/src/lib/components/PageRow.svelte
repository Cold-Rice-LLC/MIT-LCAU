<script>
	import CardRow from '#lib/components/CardRow.svelte';

	/**
	 * Anything in search results without a colour of its own, as a CardRow on
	 * grey: a person, with their role and positions, or a page, opportunity
	 * or case study, with its excerpt (queried with fetchCards).
	 */
	let { item } = $props();

	const tags = { opportunity: 'Opportunity', caseStudy: 'Case Study' };

	let row = $derived(
		item._type === 'person'
			? {
					tag: item.roles?.[0]?.title,
					image: item.photo,
					title: item.name,
					excerpt: item.positions?.join('; ')
				}
			: {
					tag: tags[item._type],
					image: item.image,
					title: item.title,
					excerpt: item.excerpt,
					imageless: !item.image
				}
	);
</script>

<CardRow link={item.link} {...row} class="bg-ui" />
