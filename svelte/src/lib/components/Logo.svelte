<script>
	/**
	 * The LCAU logo set in type: Leventhal, Center for, Advanced and
	 * Urbanism in the corners of a square, the middle two turned on their
	 * side. `short` sets the initials alone, for the small mobile mark. It
	 * scales with font-size (the square is 5.52em, as at 50px in Figma), so
	 * size it with a text-* class. Decorative: label the link around it.
	 */
	let { short = false, class: className } = $props();

	let words = $derived(
		short ? ['L', 'C', 'A', 'U'] : ['Leventhal', 'Center for', 'Advanced', 'Urbanism']
	);
</script>

<span
	aria-hidden="true"
	class={[
		'grid leading-none font-[450] tracking-[-0.04em] whitespace-nowrap *:col-start-1 *:row-start-1 *:text-trim',
		short ? 'size-[2.17em]' : 'size-[5.52em]',
		className
	]}
>
	<span class="self-start justify-self-start">{words[0]}</span>
	<span class="self-start justify-self-end [writing-mode:vertical-rl]">{words[1]}</span>
	<span class="self-end justify-self-start [writing-mode:vertical-rl]">{words[2]}</span>
	<span class="self-end justify-self-end">{words[3]}</span>
</span>
