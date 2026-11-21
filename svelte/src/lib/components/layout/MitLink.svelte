<script>
	import MitSymbol from '#lib/components/icons/MitSymbol.svelte';

	/**
	 * The MIT logo at the foot of the sidebar, linking to web.mit.edu. On
	 * hover it dims and "Visit web.mit.edu" appears. A flex row: set its
	 * display with `class`.
	 */
	let { class: className } = $props();
</script>

<a
	href="https://web.mit.edu"
	target="_blank"
	rel="noopener noreferrer"
	class={['group items-end gap-2xs', className]}
>
	<MitSymbol class="w-[7.2rem] transition-opacity group-hover:opacity-50" />
	<span class="text-body tracking-slight opacity-0 transition-opacity group-hover:opacity-100">
		Visit <span class="underline">web.mit.edu</span>↗
	</span>
</a>
