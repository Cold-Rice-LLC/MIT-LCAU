<script>
	import CardRow from '#lib/components/CardRow.svelte';
	import Fact from '#lib/components/Fact.svelte';
	import { formatDate } from '#lib/dates.js';
	import { typeLabel } from '#lib/news.js';

	/**
	 * A news post as a CardRow on brown, with its excerpt, date and type;
	 * on phones a full-width card without the excerpt (queried with newsRow).
	 */
	let { post } = $props();

	let facts = $derived(
		[
			['Date', formatDate(post.date)],
			['Type', typeLabel(post.type)]
		].filter(([, value]) => value)
	);
</script>

<CardRow
	link={post.link}
	tag="News"
	image={post.image}
	title={post.title}
	excerpt={post.excerpt}
	stacked
	class="bg-brown"
>
	{#each facts as [label, value] (label)}
		<Fact {label} {value} valueClass="lg:leading-[1.1] lg:tracking-[-0.02em]" />
	{/each}
</CardRow>
