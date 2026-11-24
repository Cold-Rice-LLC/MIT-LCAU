<script>
	import { page } from '$app/state';
	import { refineHref, replaceQuery } from '#lib/url.js';

	/**
	 * The Search label and field of a refine row, filling what's left of
	 * it. Typing sets the URL's `?q=`, which `value` is. While there's a
	 * query, a purple Clear link follows the field.
	 */
	let { placeholder, value } = $props();

	const id = $props.id();

	// Replaces the history entry rather than adding one per letter
	const oninput = (event) => replaceQuery(page.url, { q: event.currentTarget.value });
</script>

<form
	role="search"
	class="flex min-w-0 flex-1 basis-[30rem] items-center gap-[1rem]"
	onsubmit={(event) => event.preventDefault()}
>
	<label for={id} class="text-label text-trim">Search</label>
	<input
		{id}
		type="search"
		name="q"
		{placeholder}
		autocomplete="off"
		{value}
		{oninput}
		class="text-control"
	/>
	{#if value}
		<a href={refineHref(page.url, { q: null })} class="button bg-highlight text-control text-white">
			<span class="text-trim">Clear</span>
		</a>
	{/if}
</form>

<style>
	/* Clear, the field's height whatever its text's */
	a {
		display: flex;
		align-items: center;
		align-self: stretch;
		padding-block: 0;
	}

	input {
		flex: 1;
		min-width: 0;
		height: 3rem;
		padding-inline: var(--spacing-xs);
		border-radius: var(--radius-def);
		background-color: var(--color-ui);
		outline: none;

		&::placeholder {
			color: rgb(0 0 0 / 0.3);
		}

		&:focus-visible {
			outline: 2px solid var(--color-highlight);
		}

		@media (width >= 1024px) {
			height: 3.4rem;
		}
	}
</style>
