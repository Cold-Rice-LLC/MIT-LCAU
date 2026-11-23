<script>
	/**
	 * A row of refine controls with its label, like "Role": the controls
	 * scroll sideways on phones and wrap from lg. `as` is the row's element
	 * (a div, or a nav); `class` and other attributes go on it.
	 */
	let { label, as = 'div', class: className, children, ...rest } = $props();
</script>

<svelte:element this={as} {...rest} class={['flex items-start gap-xs', className]}>
	<p class="shrink-0 py-[1rem] text-label text-trim">{label}</p>
	<div class="flex gap-xs overflow-x-auto lg:flex-wrap">
		{@render children()}
	</div>
</svelte:element>
