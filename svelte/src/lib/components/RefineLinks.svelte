<script>
	import { page } from '$app/state';
	import { queryHref, refineHref } from '#lib/url.js';

	/**
	 * A labelled set of links that each show the list another way, like
	 * Sort's "Name A–Z, Name Z–A": the current one black, the rest grey
	 * until hovered, in a grey button that scrolls sideways when there's
	 * no room. Each sets `param` in the URL to its value, and `value` is the
	 * current one's. They go back to the list's first page, unless
	 * `keepPage`.
	 */
	let { label, param, options, value, keepPage = false } = $props();

	let href = $derived(keepPage ? queryHref : refineHref);
</script>

<div class="flex min-w-0 items-center gap-[1rem]">
	<p class="shrink-0 text-label text-trim">{label}</p>
	<div class="flex gap-[1rem] overflow-x-auto button text-control whitespace-nowrap text-black/30">
		{#each options as option, i (option.label)}
			<a
				href={href(page.url, { [param]: option.value })}
				aria-current={option.value === value ? 'page' : undefined}
				class="text-trim hover:text-black aria-[current]:text-black"
			>
				{option.label}{i < options.length - 1 ? ',' : ''}
			</a>
		{/each}
	</div>
</div>
