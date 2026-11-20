<script>
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import AppLink from '#lib/components/AppLink.svelte';
	import { activeTrail, sectionHref } from '#lib/navigation.js';

	/**
	 * Mobile main menu: a bar that stays at the top of the page, showing
	 * where you are ("About → People"). Opening it fills the screen with
	 * every section and its links; following one closes it.
	 */
	let { navigation } = $props();

	let open = $state(false);
	let trail = $derived(activeTrail(navigation, page.url.pathname));

	afterNavigate(() => (open = false));
</script>

<svelte:window
	onkeydown={(event) => {
		if (event.key === 'Escape') open = false;
	}}
/>

{#if navigation.length}
	<nav aria-label="Main" class="sticky top-0 z-50 h-[6.8rem] py-xs lg:hidden">
		<div class={['overflow-y-auto rounded-def bg-ui', open && 'fixed inset-xs']}>
			<button
				aria-expanded={open}
				class="sticky top-0 flex w-full items-center gap-md bg-ui p-xs text-left text-[1.6rem] leading-[1.25] whitespace-nowrap"
				onclick={() => (open = !open)}
			>
				<span class="min-w-0 flex-1 truncate">
					{#if trail.section}
						{trail.section.title} →
						<span class="text-highlight">{trail.link?.label ?? page.data.seo?.title}</span>
					{/if}
				</span>
				{open ? 'Close' : 'Menu'}
			</button>
			{#if open}
				<ul class="px-xs pb-xs text-h3">
					{#each navigation as section (section._key)}
						<li class="border-t-2 border-black/20 first:border-t-0">
							<a href={sectionHref(section)} class="block py-xs text-highlight text-trim">
								{section.title}
							</a>
							<ul class="flex flex-col gap-xs pb-xs">
								{#each section.links ?? [] as link (link._key)}
									<li><AppLink {link} class="block text-trim" /></li>
								{/each}
							</ul>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</nav>
{/if}
