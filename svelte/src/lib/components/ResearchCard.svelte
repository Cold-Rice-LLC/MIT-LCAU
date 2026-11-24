<script>
	import Card from '#lib/components/Card.svelte';
	import { researchMeta, researchTypes } from '#lib/research.js';

	/**
	 * A research project, exhibition or course as a Card in its type's colour,
	 * with its year or dates, or from lg, if `large`, its excerpt instead
	 * (queried with researchCard).
	 */
	let { item, large = false } = $props();

	let type = $derived(researchTypes[item._type]);
</script>

<Card
	link={item.link}
	tag={type.tag}
	image={item.image}
	title={item.title}
	meta={researchMeta(item)}
	excerpt={item.excerpt}
	{large}
	class={type.class}
/>
