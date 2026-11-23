<script>
	import Swiper from 'swiper';
	import { Keyboard } from 'swiper/modules';
	import 'swiper/css';
	import Image from '#lib/components/Image.svelte';
	import Logo from '#lib/components/Logo.svelte';

	/**
	 * The full-screen carousel at the top of the homepage (its Hero Slides),
	 * with the logo's words stretched to the corners above the caption
	 * strip. A Swiper loop: swipe or drag it, use the arrow keys, or click
	 * the left or right half of the screen to slide to the previous or
	 * next image, with the slides either side loaded ahead. The count and
	 * caption run along the bottom. Desktop only for now, so text-body is
	 * its 16px desktop size.
	 */
	let { slides } = $props();

	let current = $state(0);

	/** @type {Swiper} */
	let swiper;

	// The current slide and the ones either side load straight away, so the
	// next or previous one is ready before it's slid to
	const near = (i) =>
		[0, 1, slides.length - 1].includes((i - current + slides.length) % slides.length);

	// Swiper reorders the slides Svelte rendered to loop them; they never
	// change after load, so the two don't fight over them
	const carousel = (el) => {
		swiper = new Swiper(el, {
			modules: [Keyboard],
			loop: slides.length > 1,
			allowTouchMove: slides.length > 1,
			// Drags start on the prev/next buttons, outside the wrapper
			touchEventsTarget: 'container',
			keyboard: true,
			on: { realIndexChange: ({ realIndex }) => (current = realIndex) }
		});
		return () => swiper.destroy();
	};

	// A drag that starts on a button ends in a click too: ignore that one
	const go = (by) => swiper.allowClick && (by < 0 ? swiper.slidePrev() : swiper.slideNext());
</script>

{#if slides.length}
	<section
		aria-label="Featured"
		class="hidden h-svh grid-rows-[1fr_auto] overflow-hidden text-white *:col-start-1 lg:grid"
	>
		<!-- w-full: Swiper's auto side margins would stop the grid stretching it -->
		<div class="swiper row-span-full w-full" {@attach carousel}>
			<div class="swiper-wrapper">
				{#each slides as slide, i (slide._key)}
					<Image
						image={slide}
						loading={near(i) ? 'eager' : 'lazy'}
						aria-hidden={i !== current}
						class="swiper-slide object-cover"
					/>
				{/each}
			</div>

			{#if slides.length > 1}
				<button
					aria-label="Previous image"
					class="absolute inset-y-0 left-0 z-10 w-1/2 cursor-w-resize"
					onclick={() => go(-1)}
				></button>
				<button
					aria-label="Next image"
					class="absolute inset-y-0 right-0 z-10 w-1/2 cursor-e-resize"
					onclick={() => go(1)}
				></button>
			{/if}
		</div>

		<Logo fill class="logo" />

		<p
			aria-live="polite"
			class="pointer-events-none z-10 row-start-2 flex gap-md px-[1.6rem] py-xs text-body whitespace-nowrap"
		>
			<span class="text-trim">{current + 1} of {slides.length}</span>
			{#if slides[current].caption}
				<span class="min-w-0 flex-1 truncate text-trim">{slides[current].caption}</span>
			{/if}
		</p>
	</section>
{/if}

<style>
	/* The logo's words in the corners above the caption strip, sized to the
	   screen's width (108px at Figma's 1728) and shadowed to read over any
	   photo. Over Swiper, which sets its own z-index */
	section > :global(.logo) {
		z-index: 10;
		grid-row: 1;
		padding: 2rem;
		font-size: 6.25vw;
		filter: drop-shadow(0 0 0.6rem rgb(0 0 0 / 0.25));
		pointer-events: none;
	}
</style>
