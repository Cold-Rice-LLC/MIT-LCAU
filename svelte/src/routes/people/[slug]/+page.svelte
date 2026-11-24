<script>
	import AppLink from '#lib/components/AppLink.svelte';
	import ImageFrame from '#lib/components/ImageFrame.svelte';
	import ResearchSection from '#lib/components/ResearchSection.svelte';
	import RichText from '#lib/components/RichText.svelte';
	import Tags from '#lib/components/Tags.svelte';

	let { data } = $props();

	let person = $derived(data.person);
</script>

<!-- Their name, positions a line each, and roles, centred -->
<header class="col-span-full flex flex-col items-center page-top text-center">
	<h1 class="text-h1 text-trim">{person.name}</h1>
	{#if person.positions?.length}
		<p class="mt-lg text-body-lg text-trim lg:mt-xl">
			{#each person.positions as position, i (i)}
				{#if i}<br />{/if}{position}
			{/each}
		</p>
	{/if}
	<Tags labels={person.roles} class="mt-md" />
</header>

<div class="intro end-gap">
	<ImageFrame image={person.photo} aspect={3 / 2} sizes="(width >= 1024px) 40vw, 100vw" />
	{#if person.bio?.length}
		<RichText value={person.bio} />
	{/if}
</div>

{#if person.contact?.length || person.links?.length}
	<div class="contact end-gap">
		{#if person.contact?.length}
			<section class="lg:col-span-2">
				<h2>Contact</h2>
				<RichText value={person.contact} />
			</section>
		{/if}
		{#if person.links?.length}
			<section class="col-start-2 lg:col-span-2 lg:col-start-3">
				<h2>Links</h2>
				<ul class="text-trim">
					{#each person.links as link (link._key)}
						<li><AppLink {link} class="underline hover-fade" /></li>
					{/each}
				</ul>
			</section>
		{/if}
	</div>
{/if}

<ResearchSection heading="Related Research" items={person.research} />
<ResearchSection heading="Related Courses" items={person.courses} />

<style>
	@reference '../../layout.css';

	/* The photo beside the bio, halves from lg, the headline's distance
	   below it */
	.intro {
		@apply text-body;
		display: grid;
		gap: var(--spacing-md) var(--spacing-xs);
		grid-column: 1 / -1;
		margin-top: var(--spacing-2xl);

		@media (width >= 1024px) {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			margin-top: 12rem;
			line-height: 1.3;
		}
	}

	/* Contact and Links side by side, two of the nine columns each from lg */
	.contact {
		@apply text-body;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--spacing-xs);
		grid-column: 1 / -1;
		margin-top: var(--spacing-xl);

		@media (width >= 1024px) {
			grid-template-columns: subgrid;
			line-height: 1.3;
		}
	}

	h2 {
		@apply text-body-lg text-trim;
		margin-bottom: var(--spacing-md);
	}
</style>
