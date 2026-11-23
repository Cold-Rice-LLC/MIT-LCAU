<script>
	/**
	 * Figma's D - Tag / M - Tag: a dot and an uppercase mono label, in the
	 * current colour, cut off with an ellipsis when its column is too narrow.
	 */
	let { label, class: className } = $props();
</script>

<span class={['tag flex min-w-0 items-center gap-2xs text-label', className]}>
	<span class="truncate text-trim">{label}</span>
</span>

<style>
	/* The dot: 8px on phones, 10px from lg */
	.tag::before {
		content: '';
		flex-shrink: 0;
		width: 0.8rem;
		aspect-ratio: 1;
		border-radius: 50%;
		background-color: currentColor;

		@media (width >= 1024px) {
			width: 1rem;
		}
	}
</style>
