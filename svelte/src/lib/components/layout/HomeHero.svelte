<script>
	import { Carousel } from '#lib/carousel.svelte.js';
	import CarouselHalves from '#lib/components/CarouselHalves.svelte';
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

	// Swiper reorders the slides Svelte rendered to loop them; they never
	// change after load, so the two don't fight over them
	const carousel = new Carousel(() => slides.length, {
		loop: slides.length > 1,
		allowTouchMove: slides.length > 1,
		// Drags start on CarouselHalves, outside the wrapper
		touchEventsTarget: 'container'
	});
</script>

{#if slides.length}
	<section
		aria-label="Featured"
		class="hidden h-svh grid-cols-1 grid-rows-[1fr_auto] overflow-hidden text-white *:col-start-1 lg:grid"
	>
		<!-- w-full: Swiper's auto side margins would stop the grid stretching
		     it. grid-cols-1 pins the column to the screen: left to size itself,
		     it grows to a photo's own width as it loads, and Swiper, measuring
		     then, jumps to the wrong place -->
		<div class="swiper row-span-full w-full" {@attach carousel.attach}>
			<div class="swiper-wrapper">
				{#each slides as slide, i (slide._key)}
					<Image
						image={slide}
						loading={carousel.near(i) ? 'eager' : 'lazy'}
						aria-hidden={i !== carousel.current}
						class="swiper-slide object-cover"
					/>
				{/each}
			</div>

			{#if slides.length > 1}
				<CarouselHalves {carousel} />
			{/if}
		</div>

		<Logo fill class="logo" />

		<!-- Trimmed to the descenders, so a cut-off caption keeps them: the
		     6px under them makes the 12px under the baseline, as in Figma -->
		<p
			aria-live="polite"
			class="pointer-events-none z-10 row-start-2 flex gap-md px-[1.6rem] pt-xs pb-2xs text-body whitespace-nowrap *:text-trim-clipped"
		>
			<span>{carousel.current + 1} of {slides.length}</span>
			{#if slides[carousel.current].caption}
				<span class="min-w-0 flex-1 truncate">{slides[carousel.current].caption}</span>
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
