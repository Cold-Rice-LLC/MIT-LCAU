<script>
	/**
	 * The left and right halves of a Carousel, as buttons for its previous
	 * and next image. They go in the .swiper element, whose drags start on
	 * them too (touchEventsTarget: 'container'). Other attributes go on both.
	 */
	let { carousel, ...rest } = $props();

	// A drag that starts on a button ends in a click too: ignore that one
	const go = (slide) => {
		if (carousel.swiper?.allowClick) carousel.swiper[slide]();
	};
</script>

<button
	{...rest}
	type="button"
	aria-label="Previous image"
	class="absolute inset-y-0 left-0 z-10 w-1/2 cursor-w-resize"
	onclick={() => go('slidePrev')}
></button>
<button
	{...rest}
	type="button"
	aria-label="Next image"
	class="absolute inset-y-0 right-0 z-10 w-1/2 cursor-e-resize"
	onclick={() => go('slideNext')}
></button>
