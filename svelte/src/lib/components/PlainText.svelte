<script>
	import AppLink from '#lib/components/AppLink.svelte';

	/**
	 * A Sanity plainText value (paragraphs of text and links) with
	 * portableTextFields' projection. Line breaks (Shift+Enter in the Studio)
	 * stay as typed, and a paragraph after another has a line's space above.
	 * `truncate` keeps each line to one, cut off with an ellipsis where it's
	 * too long for its column. With `lines`, paragraphs have no space between
	 * them, each kept whole in one column.
	 */
	let { value = [], truncate = false, lines = false } = $props();
</script>

{#each value as block (block._key)}
	<p
		class={[
			truncate ? 'overflow-hidden text-ellipsis whitespace-pre' : 'whitespace-pre-line',
			lines && 'lines'
		]}
	>
		{#each block.children ?? [] as span (span._key)}
			{@const link = block.markDefs?.find((def) => span.marks?.includes(def._key))}
			{#if link}
				<AppLink {link} class="hover-fade">{span.text}</AppLink>
			{:else}
				{span.text}
			{/if}
		{/each}
	</p>
{/each}

<style>
	/* A line's space between paragraphs */
	p + p:not(.lines) {
		margin-top: 1lh;
	}

	.lines {
		break-inside: avoid;
	}
</style>
