<script>
	import Buttons from '#lib/components/Buttons.svelte';
	import ResearchCards from '#lib/components/ResearchCards.svelte';
	import RichText from '#lib/components/RichText.svelte';

	/**
	 * Cards for research, exhibitions or courses, with any text above and a
	 * note and buttons below: all those `picked`, else the latest `count`.
	 */
	let { text, cards, picked, count, note, links } = $props();
</script>

{#if text?.length}
	<RichText value={text} class="col-span-full measure text-body-lg" />
{/if}
{#if cards?.length}
	<ResearchCards items={picked ? cards : cards.slice(0, count)} />
{/if}
<Buttons {note} {links} class="col-span-full" />
