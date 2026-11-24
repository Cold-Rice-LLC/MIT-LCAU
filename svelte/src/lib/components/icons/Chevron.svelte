<script>
	/** A chevron pointing down, at half strength, `width` px wide (14, as in Figma's D - Dropdown). Decorative. */
	let { width = 14, class: className } = $props();

	let height = $derived(width / 2);
</script>

<svg
	aria-hidden="true"
	viewBox="0 0 {width} {height}"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	style:width="{width / 10}rem"
	class={['overflow-visible text-black/50', className]}
>
	<path d="m0 0 {height} {height} {height}-{height}" />
</svg>
