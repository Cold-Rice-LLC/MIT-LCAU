<script>
	/**
	 * Figma's D - Tag / M - Tag: a dot and an uppercase mono label, in the
	 * current colour, cut off with an ellipsis when its column is too narrow
	 * (with room either side of the trimmed capitals, so they aren't clipped).
	 * Nothing without a label.
	 */
	let { label, class: className } = $props();
</script>

{#if label}
	<span class={['tag flex min-w-0 items-center gap-2xs text-label', className]}>
		<span class="-my-[0.2em] truncate py-[0.2em] text-trim">{label}</span>
	</span>
{/if}

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
