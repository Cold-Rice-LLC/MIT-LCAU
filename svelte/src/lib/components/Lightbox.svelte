<script>
	import { untrack } from 'svelte';
	import { fade } from 'svelte/transition';
	import { prefersReducedMotion } from 'svelte/motion';
	import { page } from '$app/state';
	import { Carousel } from '#lib/carousel.svelte.js';
	import CarouselHalves from '#lib/components/CarouselHalves.svelte';
	import Image from '#lib/components/Image.svelte';
	import CloseIcon from '#lib/components/icons/CloseLarge.svelte';
	import { croppedAspect } from '#lib/sanity/images.js';

	/**
	 * Figma's D - Lightbox: images full-screen on charcoal, uncropped, each
	 * with its caption, under the page's title. Opens on mount at the image
	 * numbered `start`. Swipe it, use the arrow keys, or click its left or
	 * right half for the previous or next image, as on the homepage's hero.
	 * The ×, Escape, or a click on the edge around it calls `onclose` with
	 * the number of the image it was on. Once it's gone, the focus goes to that
	 * image's element on the page, which `originOf` gets.
	 */
	let { images, start = 0, onclose, originOf } = $props();

	const initialSlide = untrack(() => start);
	const carousel = new Carousel(() => images.length, {
		initialSlide,
		rewind: true,
		spaceBetween: 12,
		touchEventsTarget: 'container',
		keyboard: { enabled: false }
	});
	carousel.current = initialSlide;

	let duration = $derived(prefersReducedMotion.current ? 0 : 150);

	const close = () => onclose(carousel.current);

	const modal = (dialog) => {
		dialog.showModal();
		// Rather than its first button, the left half, which would be outlined
		dialog.focus();
		return () => {
			const origin = originOf(carousel.current);
			requestAnimationFrame(() => origin?.focus({ preventScroll: true }));
		};
	};

	// Before the carousels on the page under it, which take the arrows too
	const onkeydowncapture = (event) => {
		const slide = { ArrowLeft: 'slidePrev', ArrowRight: 'slideNext' }[event.key];
		if (!slide) return;
		event.preventDefault();
		event.stopImmediatePropagation();
		carousel.swiper?.[slide]();
	};
</script>

<svelte:window {onkeydowncapture} />

<!-- The click is on the edge, outside the panel; Escape closes it too -->
<dialog
	{@attach modal}
	aria-label={page.data.seo?.title}
	tabindex="-1"
	transition:fade={{ duration }}
	class="h-dvh max-h-none w-screen max-w-none bg-black/50 p-xs outline-none backdrop:bg-transparent"
	oncancel={(event) => {
		event.preventDefault();
		close();
	}}
	onclick={({ target, currentTarget }) => {
		if (target === currentTarget) close();
	}}
>
	<div class="panel">
		<h2 class="truncate px-2xl py-[0.2em] text-center text-h4 text-trim lg:text-h3">
			{page.data.seo?.title}
		</h2>

		<div class="swiper min-h-0 w-full flex-1" {@attach carousel.attach}>
			<div class="swiper-wrapper">
				{#each images as image, i (image._key)}
					<div
						class="swiper-slide"
						style:--aspect={croppedAspect(image) ?? 3 / 2}
						aria-hidden={i !== carousel.current}
					>
						<figure>
							<Image
								{image}
								sizes="90vw"
								loading={carousel.near(i) ? 'eager' : 'lazy'}
								class="w-full rounded-def"
							/>
							{#if image.caption}
								<figcaption class="text-trim-clipped mt-xs line-clamp-2 text-body">
									{image.caption}
								</figcaption>
							{/if}
						</figure>
					</div>
				{/each}
			</div>

			{#if images.length > 1}
				<!-- A click leaves the focus where it is, so the arrow keys don't
				     then outline a half -->
				<CarouselHalves {carousel} onmousedown={(event) => event.preventDefault()} />
			{/if}
		</div>

		<p aria-live="polite" class="sr-only">{carousel.current + 1} of {images.length}</p>

		<button type="button" aria-label="Close" class="absolute top-0 right-0" onclick={close}>
			<CloseIcon class="w-[5.6rem] lg:w-[7.4rem]" />
		</button>
	</div>
</dialog>

<style>
	.panel {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
		height: 100%;
		padding: var(--spacing-md) var(--spacing-xs);
		border-radius: var(--radius-def);
		background-color: var(--color-charcoal);
		color: var(--color-white);

		@media (width >= 1024px) {
			gap: var(--spacing-xl);
		}
	}

	.swiper-slide {
		display: flex;
		justify-content: center;
		align-items: center;
		container-type: size;
	}

	/* As large as fits at the image's own shape, with room for two lines of
	   caption under it */
	figure {
		width: min(100cqw, (100cqh - 5.2rem) * var(--aspect));
	}

	/* The page doesn't scroll behind it */
	:global(html:has(dialog[open])) {
		overflow: hidden;
	}
</style>
