<script>
	import { goto } from '$app/navigation';
	import { prefersReducedMotion } from 'svelte/motion';

	/**
	 * The links of "On this page" (see onThisPageLinks), each under a rule,
	 * scrolling smoothly to its section. The one for the section being read
	 * is purple, and kept in view where the list itself scrolls. `onfollow`
	 * runs when a link's clicked.
	 */
	let { links, onfollow, class: className } = $props();

	let list = $state();
	let active = $state();
	// While a clicked link's scroll is on its way, its section stays active,
	// not each one passed
	let following = false;

	const atFoot = () => scrollY + innerHeight >= document.documentElement.scrollHeight - 1;

	// How far the section is from where links scroll to: its scroll margin
	const distance = ({ id }) => {
		const section = document.getElementById(id);
		if (!section) return Infinity;
		const margin = parseFloat(getComputedStyle(section).scrollMarginTop);
		return section.getBoundingClientRect().top - margin;
	};

	// The last section to reach there, or the last of all at the foot of the
	// page, if it's too short for that
	const track = () => {
		if (following) return;
		active = (atFoot() ? links.at(-1) : links.findLast((link) => distance(link) <= 1))?.id;
	};

	const onscrollend = () => {
		following = false;
		track();
	};

	$effect(track);

	// Scrolls the list alone: scrollIntoView would move the page too
	$effect(() => {
		const link = active && list.querySelector(`[href="#${CSS.escape(active)}"]`);
		if (!link) return;
		const room = list.getBoundingClientRect();
		const { top, bottom } = link.parentElement.getBoundingClientRect();
		if (top < room.top) list.scrollTop += top - room.top;
		else if (bottom > room.bottom) list.scrollTop += bottom - room.bottom;
	});

	// In place of the browser's jump, which can drop a smooth scroll: goto
	// scrolls to the section and moves focus there. Smooth for this scroll
	// alone, as left on it would slow page changes and Back too.
	const follow = async (event, link) => {
		onfollow?.();
		if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
		event.preventDefault();

		active = link.id;
		// Unless it's there already, so nothing scrolls (or the browser can't
		// say when that ends)
		following = 'onscrollend' in window && Math.abs(distance(link)) > 1 && !atFoot();

		const hash = `#${link.id}`;
		const { style } = document.documentElement;
		if (!prefersReducedMotion.current) style.scrollBehavior = 'smooth';
		await goto(hash, { replace: location.hash === hash });
		style.scrollBehavior = '';
	};
</script>

<svelte:window onscroll={track} onresize={track} {onscrollend} />

<ul bind:this={list} class={className}>
	{#each links as link (link.id)}
		<li class="border-t-2 border-black/20">
			<a
				href="#{link.id}"
				aria-current={link.id === active ? 'location' : undefined}
				onclick={(event) => follow(event, link)}
			>
				{link.label}
			</a>
		</li>
	{/each}
</ul>

<style>
	@reference '../../../routes/layout.css';

	a {
		@apply text-h3 text-trim;
		display: block;
		padding-block: var(--spacing-xs);
		transition: color 200ms var(--default-transition-timing-function);

		@media (width >= 1024px) {
			font-size: 2rem;
			line-height: 1.2;
		}

		&[aria-current] {
			color: var(--color-highlight);
		}

		@media (hover: hover) {
			&:hover {
				color: var(--color-highlight);
			}
		}
	}
</style>
