<script>
	import { fade } from 'svelte/transition';
	import { prefersReducedMotion } from 'svelte/motion';
	import SearchScreen from '#lib/components/layout/SearchScreen.svelte';
	import { closeSearch } from '#lib/searchOverlay.js';

	/**
	 * Search results over the page they were opened from, for a `search`
	 * (see searchOverlay.js). The × or Escape goes back to the page.
	 */
	let { search } = $props();

	let duration = $derived(prefersReducedMotion.current ? 0 : 150);

	const modal = (dialog) => {
		dialog.showModal();
		dialog.querySelector('input').focus();
	};

	// Each search, and each of its pages, starts from the top
	const toTop = (dialog) => {
		if (search) dialog.scrollTop = 0;
	};
</script>

<dialog
	{@attach modal}
	{@attach toTop}
	aria-label="Search"
	transition:fade={{ duration }}
	class="h-dvh max-h-none w-screen max-w-none overflow-y-auto bg-white"
	oncancel={(event) => {
		event.preventDefault();
		closeSearch();
	}}
>
	<SearchScreen {search} onclose={closeSearch} />
</dialog>
