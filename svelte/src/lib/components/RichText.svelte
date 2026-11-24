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
			padding-left: 1.2em;
		}

		/* Figma's numbers: at the edge, with no full stop */
		& :global(ol) {
			padding-left: 1.75em;
		}

		& :global(ol > li) {
			position: relative;
		}

		& :global(ol > li::before) {
			content: counter(list-item);
			position: absolute;
			right: 100%;
			width: 1.75em;
			font-feature-settings:
				'lnum' 1,
				'tnum' 1;
		}

		& :global(ol > li + li) {
			margin-top: var(--spacing-xs);
		}
	}
</style>
