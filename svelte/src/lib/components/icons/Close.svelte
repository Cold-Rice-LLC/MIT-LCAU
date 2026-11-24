<script>
	/** An ×, in currentColor, 10px square unless `class` sizes it. Decorative. */
	let { class: className = 'size-[1rem]' } = $props();
</script>

<svg aria-hidden="true" viewBox="0 0 10 10" fill="currentColor" class={className}>
	<path
		d="M3.926 5 0 1.061 1.063 0l3.948 3.94L8.937.021 10 1.082 6.074 5 10 8.94 8.937 10 5.011 6.06 1.063 10 0 8.94 3.926 5Z"
	/>
</svg>
