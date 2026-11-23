<script>
	import { tick } from 'svelte';
	import { fade } from 'svelte/transition';
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { prefersReducedMotion } from 'svelte/motion';
	import AppLink from '#lib/components/AppLink.svelte';
	import SearchIcon from '#lib/components/icons/Search.svelte';
	import { activeTrail, sectionHref } from '#lib/navigation.js';

	/**
	 * Desktop main menu: a grey pill of section titles centred over the
	 * content grid, stuck to the top of the page. Inside a section, the
	 * others dim and the current one shows in purple (as "Events → Upcoming
	 * Events" on a page under it). Hovering or tabbing into it grows it to
	 * the grid's full width with every section's links; Search turns it
	 * into a purple search bar. Leaving, or Escape, shrinks it back.
	 *
	 * The panel's size follows what's inside it (measured), so it can
	 * animate between the pill and the full width: the open list and the
	 * search bar are the grid's width (100cqw of the nav) from the start,
	 * centred and clipped while the panel grows to them. The section titles
	 * and Search glide from their places in the pill to their columns, and
	 * back (see setOpen). Following a link skips all of that: the nav
	 * closes and takes its new breadcrumb at once.
	 */
	let { navigation, class: className } = $props();

	let open = $state(false);
	let searching = $state(false);
	let query = $state('');
	let input = $state();
	let width = $state();
	let height = $state();
	let list = $state();
	// While a navigation settles: no transitions or gliding titles
	let instant = $state(false);

	let trail = $derived(activeTrail(navigation, page.url.pathname));
	let duration = $derived(prefersReducedMotion.current ? 0 : 200);

	const startSearch = async () => {
		searching = true;
		await tick();
		input.focus();
	};

	// Each section's title, and the Search button
	const titles = () => (list ? [...list.children].map((li) => li.firstElementChild) : []);

	// Opens or closes the list, moving each title from where it was to its
	// new place (FLIP): measure, switch layouts, then start each one offset
	// back to its old spot and let it slide home, in step with the panel.
	// Measuring mid-slide picks up from where a title is on screen, so
	// quick in-and-outs don't jump.
	const setOpen = async (value) => {
		if (open === value) return;
		const before = titles().map((el) => el.getBoundingClientRect());
		open = value;
		if (instant || prefersReducedMotion.current || !before.length) return;
		await tick();
		titles().forEach((el, i) => {
			el.getAnimations().forEach((animation) => animation.cancel());
			const after = el.getBoundingClientRect();
			const x = before[i].left - after.left;
			const y = before[i].top - after.top;
			if (!x && !y) return;
			el.animate([{ transform: `translate(${x}px, ${y}px)` }, { transform: 'none' }], {
				duration: 300,
				easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
			});
		});
	};

	const close = () => {
		searching = false;
		query = '';
		setOpen(false);
	};

	// Held until the panel has been measured at its new size and painted:
	// two frames after the navigation finishes (or fails)
	beforeNavigate(({ complete }) => {
		instant = true;
		const done = () => {
			close();
			requestAnimationFrame(() => requestAnimationFrame(() => (instant = false)));
		};
		complete.then(done, done);
	});
</script>

<svelte:window
	onkeydown={(event) => {
		if (event.key === 'Escape') close();
	}}
/>

{#if navigation.length}
	<nav
		aria-label="Main"
		class={['@container sticky top-0 z-50 hidden h-0 self-start px-xs lg:block', className]}
		onmouseenter={() => setOpen(true)}
		onmouseleave={() => {
			if (!query) close();
		}}
		onfocusin={() => setOpen(true)}
		onfocusout={(event) => {
			// Checked once focus has landed: Search swaps its button for the
			// input, which drops focus for a moment
			const nav = event.currentTarget;
			setTimeout(() => {
				if (!nav.contains(document.activeElement)) close();
			});
		}}
	>
		<div
			class={['panel', searching ? 'bg-highlight' : 'bg-ui', instant && 'instant']}
			style:width={width && `${width}px`}
			style:height={height && `${height}px`}
		>
			{#if searching}
				<form
					action="/search"
					role="search"
					class="flex w-[100cqw] shrink-0 items-center gap-sm self-start px-sm py-xs text-white"
					bind:offsetWidth={width}
					bind:offsetHeight={height}
					in:fade={{ duration }}
				>
					<SearchIcon class="w-[3.4rem]" />
					<label for="search-query" class="sr-only">Search</label>
					<input
						bind:this={input}
						bind:value={query}
						id="search-query"
						type="text"
						enterkeyhint="search"
						name="q"
						placeholder="Search LCAU"
						autocomplete="off"
						class="h-xl min-w-0 flex-1 bg-transparent p-0 text-[4.8rem] leading-none tracking-[-0.02em] outline-none placeholder:text-white/50"
					/>
					<button class="cta"> Go </button>
				</form>
			{:else}
				<ul
					class={[
						'shrink-0 self-start text-[2rem] leading-none',
						open
							? 'grid w-[100cqw] auto-cols-fr grid-flow-col gap-xs px-xs pt-[1rem] pb-[12rem]'
							: 'flex gap-md px-xs py-[1rem] whitespace-nowrap'
					]}
					bind:this={list}
					bind:offsetWidth={width}
					bind:offsetHeight={height}
				>
					{#each navigation as section (section._key)}
						{@const current = section === trail.section}
						<li class="flex flex-col gap-xs">
							<a
								href={sectionHref(section)}
								class={[
									'transition-colors duration-300 text-trim',
									open && 'hover:text-highlight',
									!open && current && !trail.link && 'text-highlight',
									!open && trail.section && !current && 'text-black/40'
								]}
							>
								{section.title}{#if !open && current && trail.link}
									&nbsp;→
									{#if trail.nested}
										{trail.link.label} →
										<span class="text-highlight">{page.data.seo?.title}</span>
									{:else}
										<span class="text-highlight">{trail.link.label}</span>
									{/if}
								{/if}
							</a>
							{#if open}
								<ul
									class="border-t-2 border-black/20 pt-2xs text-body tracking-slight"
									in:fade={{ duration }}
								>
									{#each section.links ?? [] as link (link._key)}
										<li>
											<AppLink {link} class="block py-2xs text-trim hover:text-highlight" />
										</li>
									{/each}
								</ul>
							{/if}
						</li>
					{/each}
					<li class={[open && 'self-start border-b-2 border-black/20 pb-xs']}>
						<button
							aria-label={open ? undefined : 'Search'}
							class={[
								// The titles' cap height: text-trim doesn't reach into a flex box
								'flex h-[1.4rem] items-center gap-2xs',
								open ? 'hover:text-highlight' : 'opacity-40'
							]}
							onclick={startSearch}
						>
							<SearchIcon class="w-[1.4rem]" />
							{#if open}Search{/if}
						</button>
					</li>
				</ul>
			{/if}
		</div>
	</nav>
{/if}

<style>
	/* The pill, the open list or the search bar, centred over the grid.
	   Sized from what's inside it (see the script), so it can grow and
	   shrink between them */
	.panel {
		position: absolute;
		top: var(--spacing-xs);
		left: 50%;
		display: flex;
		justify-content: center;
		overflow: hidden;
		border-radius: var(--radius-def);
		translate: -50%;
		transition-property: width, height, background-color;
		transition-duration: 300ms;
		transition-timing-function: var(--default-transition-timing-function);

		@media (prefers-reduced-motion: reduce) {
			transition: none;
		}
	}

	/* While a navigation settles, everything takes its new state at once */
	.instant,
	.instant :global(*) {
		transition: none;
	}
</style>
