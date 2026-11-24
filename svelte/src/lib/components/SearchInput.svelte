<script>
	import SearchIcon from '#lib/components/icons/Search.svelte';

	/**
	 * What's in the purple search bar, for a form that goes to /search: the
	 * icon, a large field for the query, its `value`, and Go. `input` binds
	 * the field out.
	 */
	let { value = $bindable(''), input = $bindable() } = $props();

	const id = $props.id();
</script>

<SearchIcon class="w-[3.4rem]" />
<label for={id} class="sr-only">Search</label>
<input
	bind:this={input}
	bind:value
	{id}
	type="text"
	enterkeyhint="search"
	name="q"
	placeholder="Search LCAU"
	autocomplete="off"
/>
<button class="cta">Go</button>

<style>
	/* The query, 48px on the bar */
	input {
		flex: 1;
		min-width: 0;
		height: var(--spacing-xl);
		font-size: 4.8rem;
		line-height: 1;
		letter-spacing: -0.02em;
		outline: none;

		&::placeholder {
			color: rgb(255 255 255 / 0.5);
		}
	}
</style>
