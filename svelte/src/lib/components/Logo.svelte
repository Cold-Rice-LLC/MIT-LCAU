<script module>
	const words = ['Leventhal', 'Center for', 'Advanced', 'Urbanism'];

	// How much of each word shows at each step, from Figma's D - Logo
	// variants: step 1 is the initials, step 8 the full words
	const lengths = [
		[1, 2, 3, 4, 5, 7, 8, 9],
		[1, 2, 3, 4, 5, 8, 9, 10],
		[1, 2, 3, 4, 5, 6, 7, 8],
		[1, 2, 3, 4, 5, 6, 7, 8]
	];

	export const LOGO_STEPS = 8;
</script>

<script>
	import { prefersReducedMotion } from 'svelte/motion';
	import { fade } from 'svelte/transition';

	/**
	 * The LCAU logo set in type: Leventhal, Center for, Advanced and
	 * Urbanism in the corners of a square, the middle two turned on their
	 * side. `step` (1–8) shows that much of each word, as in Figma's hover
	 * animation; at step 1 the full name fades in in the middle. `short` is the
	 * small square mobile mark, initials alone. It scales with font-size (the
	 * square is 5.52em, as at 50px in Figma), so size it with a text-*
	 * class. `fill` drops the square to stretch the words to the corners of
	 * its box instead, as over the homepage hero. Decorative: label the
	 * link around it.
	 */
	let { step = LOGO_STEPS, short = false, fill = false, class: className } = $props();

	let shown = $derived(words.map((word, i) => word.slice(0, short ? 1 : lengths[i][step - 1])));
</script>

<span
	aria-hidden="true"
	class={[
		'grid leading-none font-[450] tracking-[-0.04em] whitespace-nowrap *:col-start-1 *:row-start-1 *:text-trim',
		fill ? 'size-full' : short ? 'size-[2.17em]' : 'size-[5.52em]',
		className
	]}
>
	<span class="self-start justify-self-start">{shown[0]}</span>
	<span class="self-start justify-self-end [writing-mode:vertical-rl]">{shown[1]}</span>
	<span class="self-end justify-self-start [writing-mode:vertical-rl]">{shown[2]}</span>
	<span class="self-end justify-self-end">{shown[3]}</span>
	{#if !short && step === 1}
		<span
			in:fade={{ duration: prefersReducedMotion.current ? 0 : 250 }}
			class="w-[91%] self-center justify-self-center text-center text-[max(1.2rem,0.32em)] leading-[1.2] tracking-slight whitespace-normal"
		>
			MIT Norman B. Leventhal Center for Advanced Urbanism
		</span>
	{/if}
</span>
