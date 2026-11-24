<script>
	import { tick } from 'svelte';
	import { prefersReducedMotion } from 'svelte/motion';
	import OnThisPageLinks from '#lib/components/layout/OnThisPageLinks.svelte';

	/**
	 * Figma's M - Anchor Links Panel: a grey bar held to the foot of the
	 * screen until Explore comes into view, opening upwards, over the page,
	 * into links to its sections. Following one closes it, as do Escape
	 * and a click anywhere else.
	 */
	let { links } = $props();

	let open = $state(false);
	let container = $state();
	let panel = $state();
	let toggle = $state();

	// Near Explore, where the bar moves up the screen, the page scrolls back
	// as far as it takes to fit the panel
	const onToggle = async () => {
		open = !open;
		if (!open) return;
		await tick();
		panel.scrollIntoView({
			block: 'nearest',
			behavior: prefersReducedMotion.current ? 'instant' : 'smooth'
		});
	};

	const onkeydown = (event) => {
		if (open && event.key === 'Escape') {
			open = false;
			toggle.focus();
		}
	};
	const onclick = (event) => {
		if (open && !container.contains(event.target)) open = false;
	};
</script>

<svelte:window {onkeydown} {onclick} />

<!-- Holds the bar's place; the panel opens up from its foot, as far as the
     menu's bar -->
<nav
	bind:this={container}
	aria-label="On this page"
	class="sticky bottom-xs z-40 mt-xs h-[4.5rem] lg:hidden"
>
	<div
		bind:this={panel}
		class="absolute inset-x-0 bottom-0 flex max-h-[calc(100svh-6.8rem-var(--spacing-xs))] scroll-mt-[6.8rem] scroll-mb-xs flex-col rounded-def bg-ui px-xs"
	>
		<button
			bind:this={toggle}
			type="button"
			aria-expanded={open}
			onclick={onToggle}
			class="flex h-[4.5rem] shrink-0 items-center justify-between"
		>
			<span class="text-label text-[1.6rem] text-trim">On this page</span>
			<svg
				aria-hidden="true"
				viewBox="0 0 12 6"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				class={['w-[1.2rem] overflow-visible text-black/50', !open && 'rotate-180']}
			>
				<path d="m0 0 6 6 6-6" />
			</svg>
		</button>
		{#if open}
			<OnThisPageLinks
				{links}
				onfollow={() => (open = false)}
				class="-mx-xs min-h-0 overflow-y-auto overscroll-contain px-xs pb-xs"
			/>
		{/if}
	</div>
</nav>
