<script>
	import AppLink from '#lib/components/AppLink.svelte';

	/** RichText's link mark: its target, like any other link, with its text. */
	let { portableText, children } = $props();
</script>

<AppLink link={portableText.value} class="underline hover-fade">{@render children?.()}</AppLink>
