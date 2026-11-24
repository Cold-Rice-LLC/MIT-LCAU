<script>
	/**
	 * A label over its value, in a dl: Date, Location, Term… `value` is the
	 * text, styled further by `valueClass`; `children` adds dd elements under
	 * it, like a button. `class` goes on the pair, for another gap between.
	 */
	let { label, value, valueClass, class: className = 'gap-sm', children } = $props();
</script>

<div class={['flex flex-col', className]}>
	<dt class="text-label text-trim">{label}</dt>
	{#if value}
		<dd class={['text-body-lg text-trim', valueClass]}>{value}</dd>
	{/if}
	{@render children?.()}
</div>
