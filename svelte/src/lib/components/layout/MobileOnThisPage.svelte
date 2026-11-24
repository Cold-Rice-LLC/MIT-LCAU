<script>
	import { tick } from 'svelte';
	import { prefersReducedMotion } from 'svelte/motion';
	import Chevron from '#lib/components/icons/Chevron.svelte';
	import OnThisPageLinks from '#lib/components/layout/OnThisPageLinks.svelte';
	import { Disclosure } from '#lib/disclosure.svelte.js';

	/**
	 * Figma's M - Anchor Links Panel: a grey bar held to the foot of the
	 * screen until Explore comes into view, opening upwards, over the page,
	 * into links to its sections. Following one closes it, as do Escape
	 * and a click anywhere else.
	 */
	let { links } = $props();

	const disclosure = new Disclosure();
	let panel = $state();

	// Near Explore, where the bar moves up the screen, the page scrolls back
	// as far as it takes to fit the panel
	const onToggle = async () => {
		disclosure.toggle();
		if (!disclosure.open) return;
		await tick();
		panel.scrollIntoView({
			block: 'nearest',
			behavior: prefersReducedMotion.current ? 'instant' : 'smooth'
		});
	};
</script>

<!-- Holds the bar's place; the panel opens up from its foot -->
<nav
	{@attach disclosure.attach}
	aria-label="On this page"
	class="sticky bottom-xs z-40 mt-xs h-[4.5rem] lg:hidden"
>
	<div bind:this={panel} class="panel">
		<button
			type="button"
			aria-expanded={disclosure.open}
			onclick={onToggle}
			class="flex h-[4.5rem] shrink-0 items-center justify-between"
		>
			<span class="text-label text-[1.6rem] text-trim">On this page</span>
			<Chevron width={12} class={!disclosure.open && 'rotate-180'} />
		</button>
		{#if disclosure.open}
			<OnThisPageLinks
				{links}
				onfollow={disclosure.close}
				class="-mx-xs min-h-0 overflow-y-auto overscroll-contain px-xs pb-xs"
			/>
		{/if}
	</div>
</nav>

<style>
	/* As tall as the screen at most, less the menu's bar (6.8rem) */
	.panel {
		position: absolute;
		inset: auto 0 0;
		display: flex;
		flex-direction: column;
		max-height: calc(100svh - 6.8rem - var(--spacing-xs));
		padding-inline: var(--spacing-xs);
		border-radius: var(--radius-def);
		background-color: var(--color-ui);
		scroll-margin-block: 6.8rem var(--spacing-xs);
	}
</style>
