<script>
	import AppLink from '#lib/components/AppLink.svelte';
	import { isExternalLink } from '#lib/sanity/links.js';

	/**
	 * A purple note over a row of buttons, like "Explore all research,
	 * exhibitions and sponsored courses." over "Visit Index". Either can be
	 * left out; nothing without both.
	 */
	let { note, links, class: className } = $props();
</script>

{#if note || links?.length}
	<!-- The buttons 18px under the note, as in Figma -->
	<div class={['flex flex-col items-start gap-sm', className]}>
		{#if note}
			<p class="text-body-lg text-highlight text-trim">{note}</p>
		{/if}
		{#if links?.length}
			<div class="flex flex-wrap gap-xs">
				{#each links as link (link._key)}
					<AppLink {link} class="cta">
						{link.label}
						{#if isExternalLink(link)}<span aria-hidden="true">↗</span>{/if}
					</AppLink>
				{/each}
			</div>
		{/if}
	</div>
{/if}
