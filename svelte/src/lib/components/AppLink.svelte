<script>
	import { linkHref, isExternalLink } from '#lib/sanity/links.js';

	/**
	 * Anchor for a Sanity link value (see linkFields). External URLs open in
	 * a new tab. Renders the link's label unless children are passed.
	 */
	let { link, children, ...rest } = $props();

	let external = $derived(isExternalLink(link));
</script>

<a
	{...rest}
	href={linkHref(link)}
	target={external ? '_blank' : undefined}
	rel={external ? 'noopener noreferrer' : undefined}
>
	{#if children}
		{@render children()}
	{:else}
		{link.label}
	{/if}
</a>
