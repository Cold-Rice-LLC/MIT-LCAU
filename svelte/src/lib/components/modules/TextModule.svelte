<script>
	import Buttons from '#lib/components/Buttons.svelte';
	import RichText from '#lib/components/RichText.svelte';

	/**
	 * Regular text in the site's paragraph column (690px, half the content),
	 * or large text across the middle 7 columns, like the About page's
	 * Mission. Any note and buttons are 36px under it.
	 */
	let { text, size, note, links } = $props();

	let large = $derived(size === 'large');
	let column = $derived(large ? 'lg:col-span-7 lg:col-start-2' : 'col-span-full measure');
</script>

<RichText value={text} class={[column, large ? 'text-h3' : 'text-body-lg']} />
<Buttons {note} {links} class={['lg:-mt-xs', column]} />
