<script>
	import MitSymbol from '#lib/components/icons/MitSymbol.svelte';

	/**
	 * The MIT logo at the foot of the sidebar, linking to web.mit.edu. It
	 * blends by difference, so it shows dark over the white page and light
	 * over images. On hover it dims and "Visit web.mit.edu" appears.
	 */
	let { class: className } = $props();
</script>

<a
	href="https://web.mit.edu"
	target="_blank"
	rel="noopener noreferrer"
	class={['group flex items-end gap-2xs text-white mix-blend-difference', className]}
>
	<MitSymbol class="w-[7.2rem] transition-opacity group-hover:opacity-50" />
	<span
		class="text-[1.6rem] leading-[1.2] tracking-slight opacity-0 transition-opacity group-hover:opacity-100"
	>
		Visit <span class="underline">web.mit.edu</span>↗
	</span>
</a>
