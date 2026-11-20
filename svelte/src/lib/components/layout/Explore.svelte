<script>
	import AppLink from '#lib/components/AppLink.svelte';
	import Image from '#lib/components/Image.svelte';

	/**
	 * The large links above the footer on every page. On desktop, hovering
	 * one turns it purple and shows its description, with its image beside
	 * it in the sidebar's column.
	 */
	let { links } = $props();
</script>

{#if links.length}
	<nav aria-label="Explore" class="py-xs lg:pt-xl lg:pb-[15.6rem]">
		<ul>
			{#each links as { _key, link, description, image } (_key)}
				<li class="group relative border-t-2 border-black/20">
					<AppLink {link} class="flex gap-[3.2rem] py-sm lg:py-md">
						<span class="flex-1 text-display group-hover:text-highlight">{link.label}</span>
						{#if description}
							<span
								class="hidden flex-1 text-[1.6rem] leading-[1.25] opacity-0 group-hover:opacity-100 lg:block"
							>
								{description}
							</span>
						{/if}
					</AppLink>
					{#if image?.asset}
						<Image
							{image}
							aspect={3 / 2}
							sizes="30rem"
							class="pointer-events-none invisible absolute -top-[0.2rem] right-full mr-xs hidden w-[30rem] rounded-def group-hover:visible lg:block"
						/>
					{/if}
				</li>
			{/each}
		</ul>
	</nav>
{/if}
