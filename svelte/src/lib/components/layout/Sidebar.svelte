<script>
	import LogoLink from '#lib/components/LogoLink.svelte';
	import MitLink from '#lib/components/layout/MitLink.svelte';
	import OnThisPage from '#lib/components/layout/OnThisPage.svelte';

	/** `links` are the page's "On this page" links, if it has any. */
	let { links = [] } = $props();
</script>

<!-- Desktop only: the logo, with "On this page" under it, and the MIT link
     in the layout's first column, each stuck on its own so they can stop in
     different places. -->

<div>
	<LogoLink
		class="shrink-0 self-start rounded-def bg-charcoal p-xs pb-[1.6rem] text-(length:--logo-size) text-white"
	/>
	{#if links.length}
		<OnThisPage {links} class="min-h-0" />
	{/if}
</div>

<!-- Held to the foot of the screen, over the Explore images, until the
     footer pushes it up. Its top margin keeps it at least a screen below the
     logo (less its own 3.81rem height and the gap) while the homepage's hero
     scrolls away. -->
<MitLink
	class={[
		'sticky bottom-xs z-10 col-start-1 row-start-1 mb-xs ml-xs hidden self-end justify-self-start lg:flex',
		'mt-[calc(100svh-var(--spacing-xs)-3.81rem)]'
	]}
/>

<style>
	/* The logo is sized like the footer's (--logo-size). Stops once the
	   Explore links reach its foot, so their images never cover it: sticking
	   ends where its margin box meets the foot of the page, so the margin is
	   Explore's height (--explore-height, from the layout), if it's there. At most the
	   screen's height less the MIT link's 3.81rem and the gaps, so "On this
	   page" never reaches it. */
	div {
		display: none;

		@media (width >= 1024px) {
			position: sticky;
			top: var(--spacing-xs);
			display: flex;
			flex-direction: column;
			gap: var(--spacing-xs);
			grid-area: 1 / 1;
			align-self: start;
			max-height: calc(100svh - 3 * var(--spacing-xs) - 3.81rem);
			margin: var(--spacing-xs) 0 var(--explore-height, 0) var(--spacing-xs);
		}
	}
</style>
