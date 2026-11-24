<script>
	import { Carousel } from '#lib/carousel.svelte.js';
	import Figure from '#lib/components/Figure.svelte';
	import Lightbox from '#lib/components/Lightbox.svelte';

	/**
	 * A set of images, each opening in a Lightbox. As a carousel across the
	 * middle 7 columns: swipe it, or use Previous and Next under it, which
	 * rewind from the last image to the first; on phones the next image peeks
	 * in from the right and the buttons hide, as in Figma. As a grid, three
	 * across (two on phones). Captions are cut to two lines.
	 */
	let { display, images = [] } = $props();

	const carousel = new Carousel(() => images.length, {
		slidesPerView: 'auto',
		spaceBetween: 12,
		rewind: true
	});

	// The number of the image open in the lightbox, or null
	let opened = $state(null);

	// A drag ends in a click too: ignore that one
	const open = (i) => {
		if (carousel.swiper?.allowClick ?? true) opened = i;
	};

	// Each image's button, for the lightbox to return to
	let gallery = $state();
	const originOf = (i) => gallery?.querySelectorAll('figure > button')[i];

	const onclose = (i) => {
		opened = null;
		carousel.swiper?.slideTo(i);
	};
</script>

{#if display === 'grid'}
	<ul bind:this={gallery} class="col-span-full grid grid-cols-2 gap-x-xs gap-y-sm lg:grid-cols-3">
		{#each images as image, i (image._key)}
			<li>
				<Figure
					{image}
					sizes="(width >= 1024px) 27vw, 50vw"
					onopen={() => open(i)}
					expandIcon
					clamp
				/>
			</li>
		{/each}
	</ul>
{:else}
	<div bind:this={gallery} class="lg:col-span-7 lg:col-start-2">
		<div class="swiper" {@attach carousel.attach}>
			<div class="swiper-wrapper">
				{#each images as image, i (image._key)}
					<Figure
						{image}
						sizes="(width >= 1024px) 60vw, 95vw"
						loading={carousel.near(i) ? 'eager' : 'lazy'}
						aria-hidden={i !== carousel.current}
						onopen={() => open(i)}
						focusable={i === carousel.current}
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
{/if}

{#if opened !== null}
	<Lightbox {images} start={opened} {onclose} {originOf} />
{/if}
