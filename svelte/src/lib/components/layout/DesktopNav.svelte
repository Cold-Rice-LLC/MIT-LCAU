<script>
	import { page } from '$app/state';
	import AppLink from '#lib/components/AppLink.svelte';
	import { activeTrail, sectionHref } from '#lib/navigation.js';

	/**
	 * Desktop main menu: a pill of section titles that stays at the top of
	 * the page. Inside a section, the others dim and the current one shows
	 * in purple (as "Events → Upcoming Events" on a page under it). Hovering
	 * or tabbing into it opens every section's links across the page.
	 */
	let { navigation } = $props();

	let open = $state(false);
	let trail = $derived(activeTrail(navigation, page.url.pathname));
</script>

<svelte:window
	onkeydown={(event) => {
		if (event.key === 'Escape') open = false;
	}}
/>

{#if navigation.length}
	<nav
		aria-label="Main"
		class="sticky top-0 z-50 hidden h-[5.8rem] items-center justify-center lg:flex"
		onmouseenter={() => (open = true)}
		onmouseleave={() => (open = false)}
		onfocusin={() => (open = true)}
		onfocusout={(event) => {
			if (!event.currentTarget.contains(event.relatedTarget)) open = false;
		}}
	>
		<ul
			class={[
				'rounded-def bg-ui text-[2rem] leading-none',
				open
					? 'absolute inset-x-0 top-xs grid auto-cols-fr grid-flow-col gap-xs p-xs pb-[12rem]'
					: 'flex gap-md px-xs py-4'
			]}
		>
			{#each navigation as section (section._key)}
				{@const current = section === trail.section}
				<li class="flex flex-col gap-xs">
					<a
						href={sectionHref(section)}
						class={[
							'text-trim',
							!open && current && !trail.link && 'text-highlight',
							!open && trail.section && !current && 'text-black/40'
						]}
					>
						{section.title}{#if !open && current && trail.link}
							&nbsp;→ <span class="text-highlight">{trail.link.label}</span>
						{/if}
					</a>
					{#if open}
						<ul
							class="border-t-2 border-black/20 pt-2xs text-[1.6rem] leading-[1.2] tracking-slight"
						>
							{#each section.links ?? [] as link (link._key)}
								<li><AppLink {link} class="block py-2xs text-trim" /></li>
							{/each}
						</ul>
					{/if}
				</li>
			{/each}
		</ul>
	</nav>
{/if}
