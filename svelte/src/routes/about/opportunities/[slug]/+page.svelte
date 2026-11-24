<script>
	import AppLink from '#lib/components/AppLink.svelte';
	import Fact from '#lib/components/Fact.svelte';
	import RichText from '#lib/components/RichText.svelte';

	let { data } = $props();

	let opportunity = $derived(data.opportunity);

	// The Application URL as a link value, so AppLink opens it in a new tab
	let applyLink = $derived(
		opportunity.applyUrl && { linkType: 'external', externalUrl: opportunity.applyUrl }
	);

	// "March 9, 2026", read as UTC so the date doesn't slip back a day
	let postedOn = $derived(
		opportunity.postedOn &&
			new Date(opportunity.postedOn).toLocaleDateString('en-US', {
				dateStyle: 'long',
				timeZone: 'UTC'
			})
	);

	let facts = $derived(
		[
			['Term', opportunity.term],
			['Hiring Range', opportunity.salaryRange],
			['Posted On', postedOn]
		].filter(([, value]) => value)
	);

	let showHowToApply = $derived(opportunity.howToApply?.length || applyLink);
</script>

{#snippet apply()}
	<AppLink link={applyLink} class="cta">Apply <span aria-hidden="true">↗</span></AppLink>
{/snippet}

<!-- The title, and the facts four across below it (two on phones) -->
<header class="col-span-full pt-[6rem] lg:pt-3xl">
	<h1 class="text-center text-h1 text-trim">{opportunity.title}</h1>
	<dl class="mt-2xl grid grid-cols-2 gap-x-xs gap-y-lg lg:mt-[14.2rem] lg:grid-cols-4">
		{#each facts as [label, value] (label)}
			<Fact {label} {value} valueClass="lg:leading-[1.3]" />
		{/each}
		{#if opportunity.deadline || applyLink}
			<Fact label="Apply" value={opportunity.deadline} valueClass="lg:leading-[1.3]">
				{#if applyLink}
					<dd class="flex">{@render apply()}</dd>
				{/if}
			</Fact>
		{/if}
	</dl>
</header>

<!-- The description beside the details, with How to Apply at the foot of
     the details; stacked on phones. Halves from lg, each column 24px short
     of the gutter as in Figma. -->
<div class="col-span-full mt-[8.4rem] end-gap grid gap-x-xs gap-y-2xl lg:mt-3xl lg:grid-cols-2">
	{#if opportunity.body?.length}
		<RichText value={opportunity.body} class="text-body-lg lg:pr-md" />
	{/if}
	{#if opportunity.details?.length || showHowToApply}
		<div class="details flex flex-col gap-lg lg:col-start-2 lg:gap-xl lg:pr-md">
			{#if opportunity.details?.length}
				<RichText value={opportunity.details} />
			{/if}
			{#if showHowToApply}
				<section class="flex flex-col items-start gap-md">
					<h2>How to Apply</h2>
					{#if opportunity.howToApply?.length}
						<RichText value={opportunity.howToApply} />
					{/if}
					{#if applyLink}
						{@render apply()}
					{/if}
				</section>
			{/if}
		</div>
	{/if}
</div>

<style>
	@reference '../../../layout.css';

	/* The details' text, and its subheadings and How to Apply's heading:
	   H3 on phones, H4 from lg, a section's gap above and 24px below */
	.details {
		& :global(.rich-text) {
			font-size: 1.6rem;
			line-height: 1.25;

			@media (width >= 1024px) {
				line-height: 1.2;
			}
		}

		& :global(.rich-text h3),
		& h2 {
			@apply text-h3 text-trim;

			@media (width >= 1024px) {
				@apply text-h4;
			}
		}

		& :global(.rich-text > h3:not(:first-child)) {
			margin-top: var(--spacing-lg);

			@media (width >= 1024px) {
				margin-top: var(--spacing-xl);
			}
		}

		& :global(.rich-text > h3 + *) {
			margin-top: var(--spacing-md);
		}
	}
</style>
