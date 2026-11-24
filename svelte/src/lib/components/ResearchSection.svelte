<script>
	import ResearchCards from '#lib/components/ResearchCards.svelte';
	import Section from '#lib/components/Section.svelte';

	/** A Section of ResearchCards, like Related Research. Nothing without any. */
	let { heading, items } = $props();
</script>

{#if items?.length}
	<Section {heading}>
		<ResearchCards {items} />
	</Section>
{/if}
