<script>
	import CardRow from '#lib/components/CardRow.svelte';
	import Fact from '#lib/components/Fact.svelte';
	import { formatYears, researchMeta, researchTypes } from '#lib/research.js';

	/**
	 * A research project, exhibition or course as a CardRow in its type's
	 * colour, with its excerpt, or an exhibition's dates, and its year, theme
	 * and field, each in its own column whether or not it has the others
	 * (queried with researchCard, plus `themes` and `fields`); on phones just
	 * its year or dates.
	 */
	let { item } = $props();

	let type = $derived(researchTypes[item._type]);
	let course = $derived(item._type === 'course');
	let meta = $derived(researchMeta(item));

	let facts = $derived(
		[
			['Year', course ? `${item.year}\nCourse Year` : formatYears(item), 'lg:col-start-1'],
			['Theme', item.themes?.join(', '), 'lg:col-start-2'],
			['Field', item.fields?.join(', '), 'lg:col-start-3']
		].filter(([, value]) => value)
	);
</script>

<CardRow
	link={item.link}
	tag={type.tag}
	image={item.image}
	title={item.title}
	excerpt={item._type === 'exhibition' ? meta : item.excerpt}
	{meta}
	columns={3}
	class={type.class}
>
	{#each facts as [label, value, column] (label)}
		<Fact
			{label}
			{value}
			valueClass="whitespace-pre-line wrap-break-word"
			class={['row-start-1 min-w-0 gap-sm', column]}
		/>
	{/each}
</CardRow>
