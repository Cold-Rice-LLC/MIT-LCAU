<script>
	import Tag from '#lib/components/Tag.svelte';
	import Close from '#lib/components/icons/Close.svelte';

	/**
	 * Figma's D - Refine Controls: a grey button with a tag, purple with a
	 * close mark while `selected`. A link given `href` (marked as the
	 * current page while selected), else a button (marked as pressed).
	 * Other attributes, like `onclick`, pass through.
	 */
	let { label, selected = false, href, ...rest } = $props();
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	{...rest}
	{href}
	aria-current={href && selected ? 'page' : undefined}
	aria-pressed={href ? undefined : selected}
	class={[
		'flex shrink-0 items-center gap-xs button',
		selected ? 'bg-highlight text-white' : 'bg-ui'
	]}
>
	<Tag {label} />
	{#if selected}
		<Close />
	{/if}
</svelte:element>
