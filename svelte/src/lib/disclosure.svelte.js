import { on } from 'svelte/events';

/**
 * Something a button opens, like the calendar or a dropdown. Attach
 * `attach` to the element around the two, and read or set `open`. Escape
 * closes it, back to the button, and so does a click anywhere else.
 */
export class Disclosure {
	open = $state(false);

	toggle = () => {
		this.open = !this.open;
	};

	close = () => {
		this.open = false;
	};

	attach = (el) => {
		const offKeydown = on(window, 'keydown', ({ key }) => {
			if (!this.open || key !== 'Escape') return;
			this.close();
			el.querySelector('[aria-expanded]').focus();
		});
		const offClick = on(window, 'click', ({ target }) => {
			if (this.open && !el.contains(target)) this.close();
		});
		return () => {
			offKeydown();
			offClick();
		};
	};
}
