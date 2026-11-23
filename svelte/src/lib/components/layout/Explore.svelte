<script>
	import AppLink from '#lib/components/AppLink.svelte';
	import Image from '#lib/components/Image.svelte';

	/**
	 * The large links above the footer on every page. On desktop, hovering
	 * one turns it purple and shows its description, and its image grows
	 * out of the sidebar's column from the top-right corner (timed from the
	 * designers' prototype). `height` binds its height out, for the
	 * sidebar's logo to stop above it.
	 */
	let { links, height = $bindable(0), class: className } = $props();
</script>

{#if links.length}
	<nav
		aria-label="Explore"
		class={['py-xs lg:pt-xl lg:pb-[15.6rem]', className]}
		bind:offsetHeight={height}
	>
		<ul>
			{#each links as { _key, link, description, image } (_key)}
				<li class="group relative border-t-2 border-black/20">
					<AppLink {link} class="flex gap-[3.2rem] py-sm lg:py-md">
						<span
							class="flex-1 text-display leading-[0.95] transition-colors duration-200 text-trim group-hover:text-highlight"
						>
							{link.label}
						</span>
						{#if description}
							<span
								class="hidden flex-1 text-[1.6rem] leading-[1.25] opacity-0 transition-opacity duration-200 text-trim group-hover:opacity-100 lg:block"
							>
								{description}
							</span>
						{/if}
					</AppLink>
					{#if image?.asset}
						<Image {image} aspect={3 / 2} sizes="30rem" />
					{/if}
				</li>
			{/each}
		</ul>
	</nav>
{/if}

<style>
	/* The image fills the sidebar's column, beside the link's top rule.
	   Hovering grows it from Figma's 36px box in the column's top-right
	   corner; leaving shrinks it back. This replaces Image's own fade-in,
	   so it only shows once loaded. */
	li :global(img) {
		position: absolute;
		top: -0.2rem;
		right: 100%;
		display: none;
		width: calc(var(--logo-column) + var(--spacing-xs));
		margin-right: var(--spacing-xs);
		border-radius: var(--radius-def);
		opacity: 0;
		pointer-events: none;
		scale: 0.12;
		transform-origin: top right;
		transition-property: opacity, scale;
		transition-duration: 200ms;
		transition-timing-function: var(--default-transition-timing-function);

		@media (width >= 1024px) {
			display: block;
		}

		@media (prefers-reduced-motion: reduce) {
			scale: 1;
		}
	}

	li:hover :global(img.loaded) {
		opacity: 1;
		scale: 1;
	}
</style>
