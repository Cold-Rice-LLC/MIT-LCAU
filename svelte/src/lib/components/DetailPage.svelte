<script>
	import Tag from '#lib/components/Tag.svelte';
	import Modules from '#lib/components/modules/Modules.svelte';

	/**
	 * A research project, exhibition or course: its title, subtitle, `lines`
	 * (its year, or its dates and where it is) and `tags`, centred, with 12px
	 * more than a section's gap below (24px from lg), then its modules and,
	 * as children, its related sections. `smallHeadings` passes to Modules.
	 */
	let { page, lines = [], tags = [], smallHeadings = false, children } = $props();
</script>

<header
	class="col-span-full end-gap flex flex-col gap-lg page-top pb-xs text-center lg:gap-xl lg:pb-md"
>
	<h1 class="text-h1 text-trim">{page.title}</h1>
	{#if page.subtitle}
		<p class="text-h3 text-trim">{page.subtitle}</p>
	{/if}
	{#if lines.length || tags.length}
		<div class="flex flex-col gap-md">
			{#each lines as line (line)}
				<p class="text-body-lg text-trim">{line}</p>
			{/each}
			{#if tags.length}
				<ul class="flex flex-wrap justify-center gap-x-xs gap-y-sm lg:gap-x-md">
					{#each tags as tag (tag)}
						<li><Tag label={tag} /></li>
					{/each}
				</ul>
			{/if}
		</div>
	{/if}
</header>

<Modules modules={page.modules} {smallHeadings} />

{@render children?.()}
