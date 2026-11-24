<script>
	/** Figma's D - Accordion's thin + (`open`) and × (`close`): style whichever isn't wanted away. Decorative. */
	let { class: className } = $props();
</script>

<svg aria-hidden="true" viewBox="0 0 22 22" fill="currentColor" class={className}>
	<path
		class="open"
		d="M10.039 10.051V0h1.922v10.051H22v1.855H11.961V22H10.04V11.906H0v-1.855h10.039Z"
	/>
	<path
		class="close"
		d="M9.65 11.009 2.541 3.9l1.36-1.36 7.107 7.107 7.098-7.099 1.312 1.312-7.099 7.099 7.138 7.137-1.36 1.36-7.137-7.138-7.099 7.099-1.311-1.312L9.65 11.01Z"
	/>
</svg>
