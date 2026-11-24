<script>
	import Card from '#lib/components/Card.svelte';
	import CardColumns from '#lib/components/CardColumns.svelte';

	/** Grants to apply for, as large cards that open another site, with or without an image. */
	let { calls } = $props();
</script>

<CardColumns items={calls} class="items-start">
	{#snippet card({ title, text, image, url })}
		<Card
			link={{ linkType: 'external', externalUrl: url }}
			tag="Grant"
			{image}
			{title}
			excerpt={text}
			large
			uncut
			class="bg-blue"
		/>
	{/snippet}
</CardColumns>
