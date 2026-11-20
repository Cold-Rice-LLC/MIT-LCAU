<script>
	import AppLink from '#lib/components/AppLink.svelte';

	/**
	 * A Sanity plainText value (paragraphs of text and links) with
	 * plainTextFields' projection. Line breaks (Shift+Enter in the Studio)
	 * stay as typed, and a paragraph after another has a line's space above.
	 */
	let { value = [] } = $props();
</script>

{#each value as block (block._key)}
	<p class="whitespace-pre-line [p+&]:mt-[1lh]">
		{#each block.children ?? [] as span (span._key)}
			{@const link = block.markDefs?.find((def) => span.marks?.includes(def._key))}
			{#if link}
				<AppLink {link} class="transition-opacity duration-200 hover:opacity-50"
					>{span.text}</AppLink
				>
			{:else}
				{span.text}
			{/if}
		{/each}
	</p>
{/each}
