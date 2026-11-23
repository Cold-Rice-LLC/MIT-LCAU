<script>
	import { Carousel } from '#lib/carousel.svelte.js';
	import Figure from '#lib/components/Figure.svelte';

	/**
	 * A carousel across the middle 7 columns: swipe it, or use Previous and
	 * Next under it, which rewind from the last image to the first. Captions
	 * are cut to two lines. On phones the next image peeks in from the right
	 * and the buttons hide, as in Figma. The Grid display isn't built yet.
	 */
	let { images = [] } = $props();

	const carousel = new Carousel(() => images.length, {
		slidesPerView: 'auto',
		spaceBetween: 12,
		rewind: true
	});
</script>

<div class="lg:col-span-7 lg:col-start-2">
	<div class="swiper" {@attach carousel.attach}>
		<div class="swiper-wrapper">
			{#each images as image, i (image._key)}
				<Figure
					{image}
					sizes="(width >= 1024px) 60vw, 95vw"
					loading={carousel.near(i) ? 'eager' : 'lazy'}
					aria-hidden={i !== carousel.current}
					class="swiper-slide w-[calc(100%-1.8rem)] lg:w-full"
					clamp
				/>
			{/each}
		</div>
	</div>

	{#if images.length > 1}
		<!-- 12px under the clamped captions' descenders: 18px under their
		     baseline, as in Figma -->
		<div
			class="mt-xs hidden grid-cols-3 gap-xs text-center text-body leading-[1.1] *:button *:text-trim lg:grid"
		>
			<button onclick={() => carousel.swiper?.slidePrev()}>
				<span aria-hidden="true">←&ensp;</span>Previous
			</button>
			<p aria-live="polite">{carousel.current + 1} of {images.length}</p>
			<button onclick={() => carousel.swiper?.slideNext()}>
				Next<span aria-hidden="true">&ensp;→</span>
			</button>
		</div>
	{/if}
</div>
