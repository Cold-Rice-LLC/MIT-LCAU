<script>
	import AppLink from '#lib/components/AppLink.svelte';
	import RichText from '#lib/components/RichText.svelte';

	/**
	 * Every open opportunity, newest first, each with "Learn More", then the
	 * subheading and text under them, all in the paragraph column. With
	 * nothing open, only the text shows.
	 */
	let { opportunities = [], subheading, text } = $props();
</script>

{#if opportunities.length}
	<ul class="col-span-full measure flex flex-col gap-xs">
		{#each opportunities as { _id, title, excerpt, link } (_id)}
			<li class="flex flex-col items-start gap-sm rounded-def bg-ui p-xs lg:gap-xs">
				<h3 class="text-h3 text-trim">{title}</h3>
				{#if excerpt}
					<p class="text-body text-trim lg:mt-xs">{excerpt}</p>
				{/if}
				<AppLink {link} class="cta">
					Learn More<span class="sr-only">: {title}</span>
				</AppLink>
			</li>
		{/each}
	</ul>
{/if}

{#if subheading || text?.length}
	<div class="col-span-full measure flex flex-col gap-md lg:gap-lg">
		{#if subheading}
			<h3 class="text-h3 text-trim">{subheading}</h3>
		{/if}
		<RichText value={text} class="text-body-lg" />
	</div>
{/if}
