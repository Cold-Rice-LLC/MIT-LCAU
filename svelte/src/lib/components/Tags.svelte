<script>
	import Tag from '#lib/components/Tag.svelte';

	/** A row of Tags under a page's title, centred. Nothing without any. */
	let { labels, class: className } = $props();
</script>

{#if labels?.length}
	<ul class={['flex flex-wrap justify-center gap-x-xs gap-y-sm lg:gap-x-md', className]}>
		{#each labels as label (label)}
			<li><Tag {label} /></li>
		{/each}
	</ul>
{/if}
