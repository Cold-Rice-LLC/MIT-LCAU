<script>
	import RichText from '#lib/components/RichText.svelte';

	/**
	 * Regular text in the site's paragraph column (690px, half the content),
	 * or large text across the middle 7 columns, like the About page's
	 * Mission.
	 */
	let { text, size } = $props();
</script>

<RichText
	value={text}
	class={size === 'large'
		? 'text-h3 lg:col-span-7 lg:col-start-2'
		: 'col-span-full measure text-body-lg'}
/>
