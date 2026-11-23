<script>
	import { PortableText } from '@portabletext/svelte';
	import RichTextLink from '#lib/components/RichTextLink.svelte';

	/**
	 * A Sanity richText (or plainText) value queried with portableTextFields:
	 * paragraphs a line apart, H3 subheadings, lists, and underlined links,
	 * trimmed to the first line's capitals and the last line's baseline as
	 * in Figma. Set the text style with `class`; line breaks (Shift+Enter)
	 * stay as typed.
	 */
	let { value = [], class: className } = $props();
</script>

<div class={['rich-text text-trim', className]}>
	<PortableText {value} components={{ marks: { link: RichTextLink } }} />
</div>

<style>
	@reference '../../routes/layout.css';

	.rich-text {
		& > :global(* + *) {
			margin-top: 1lh;
		}

		& :global(h3) {
			@apply text-h3;
		}

		& :global(ul) {
			list-style: disc;
		}

		& :global(ol) {
			list-style: decimal;
		}

		& :global(:is(ul, ol)) {
			padding-left: 1.2em;
		}
	}
</style>
