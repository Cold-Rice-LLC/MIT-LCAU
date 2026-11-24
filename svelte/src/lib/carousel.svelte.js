import Swiper from 'swiper';
import { Keyboard } from 'swiper/modules';

/**
 * A Swiper carousel's state, shared by the homepage hero, the gallery
 * module and the lightbox. `count` gets the number of slides. Attach `attach` to the
 * .swiper element, read `current` (the real slide index, looped or not)
 * and `near(i)`, and call `swiper.slidePrev()` / `slideNext()`. The arrow
 * keys move it while it's on screen.
 */
export class Carousel {
	current = $state(0);

	/** @type {Swiper | undefined} */
	swiper;

	#count;
	#options;

	/**
	 * @param {() => number} count
	 * @param {import('swiper/types').SwiperOptions} options
	 */
	constructor(count, options) {
		this.#count = count;
		this.#options = options;
	}

	// The current slide and the ones either side, wrapping round, load
	// straight away, so the next or previous one is ready before it's slid to
	near = (i) => {
		const count = this.#count();
		return [0, 1, count - 1].includes((i - this.current + count) % count);
	};

	attach = (el) => {
		this.swiper = new Swiper(el, {
			modules: [Keyboard],
			keyboard: { onlyInViewport: true },
			...this.#options,
			on: { realIndexChange: ({ realIndex }) => (this.current = realIndex) }
		});
		return () => this.swiper?.destroy();
	};
}
