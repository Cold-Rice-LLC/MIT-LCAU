<script>
	import RichText from '#lib/components/RichText.svelte';
	import OpenCloseIcon from '#lib/components/icons/OpenClose.svelte';

	/**
	 * Figma's D - Accordion / M - Accordion: titles across the middle 7
	 * columns, each under a rule, that open to show their text. Any number
	 * can be open at once. An open one's title is purple and centred.
	 */
	let { items = [], heading } = $props();
</script>

<div class="lg:col-span-7 lg:col-start-2">
	{#each items as item (item._key)}
		<details class="border-t-2 border-black/20">
			<summary>
				<svelte:element this={heading ? 'h3' : 'h2'} class="text-h3 text-trim">
					{item.title}
				</svelte:element>
				<OpenCloseIcon />
			</summary>
			<RichText value={item.text} class="measure pt-xs pb-md text-body-lg lg:pt-md lg:pb-xl" />
		</details>
	{/each}
</div>

<style>
	/* The icon is at the right, with room for it beside a long title: on both
	   sides of a centred one */
	summary {
		position: relative;
		padding: var(--spacing-md) var(--spacing-xl) var(--spacing-md) 0;
		cursor: pointer;
		list-style: none;
		transition: color 200ms var(--default-transition-timing-function);

		&::-webkit-details-marker {
			display: none;
		}

		& > :global(svg) {
			position: absolute;
			top: 2.2rem;
			right: 0.2rem;
			width: 2rem;
			color: rgb(0 0 0 / 0.4);
			transition: inherit;

			@media (width >= 1024px) {
				top: var(--spacing-md);
				right: var(--spacing-xs);
				width: 2.2rem;
			}
		}

		/* + while it's closed, × while it's open */
		:not([open]) > & > :global(svg .close),
		[open] > & > :global(svg .open) {
			display: none;
		}

		@media (hover: hover) {
			&:hover {
				color: var(--color-highlight);
			}

			&:hover > :global(svg) {
				color: var(--color-black);
			}
		}

		[open] > & {
			padding-left: var(--spacing-xl);
			color: var(--color-highlight);
			text-align: center;
		}

		[open] > & > :global(svg) {
			color: var(--color-highlight);
		}
	}
</style>
