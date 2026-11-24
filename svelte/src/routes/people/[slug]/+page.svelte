<script>
	import AppLink from '#lib/components/AppLink.svelte';
	import Card from '#lib/components/Card.svelte';
	import ImageFrame from '#lib/components/ImageFrame.svelte';
	import RichText from '#lib/components/RichText.svelte';
	import Section from '#lib/components/Section.svelte';
	import Tag from '#lib/components/Tag.svelte';

	let { data } = $props();

	let person = $derived(data.person);

	// Their research and courses as Cards (extra fields are ignored)
	let research = $derived(
		person.research.map((project) => ({
			...project,
			tag: 'Research',
			meta: [project.year, project.category].filter(Boolean).join(', '),
			class: 'bg-cool-gray'
		}))
	);
	let courses = $derived(
		person.courses.map((course) => ({
			...course,
			tag: 'Course',
			meta: course.year && `${course.year} Course Year`,
			class: 'bg-pink'
		}))
	);
</script>

<!-- Their name, positions a line each, and role, centred -->
<header class="col-span-full flex flex-col items-center pt-[6rem] text-center lg:pt-3xl">
	<h1 class="text-h1 text-trim">{person.name}</h1>
	{#if person.positions?.length}
		<p class="mt-lg text-body-lg text-trim lg:mt-xl">
			{#each person.positions as position, i (i)}
				{#if i}<br />{/if}{position}
			{/each}
		</p>
	{/if}
	<Tag label={person.role} class="mt-md" />
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

{#snippet related(heading, cards)}
	{#if cards.length}
		<Section {heading}>
			<ul class="col-span-full card-grid">
				{#each cards as card (card._id)}
					<li><Card {...card} /></li>
				{/each}
			</ul>
		</Section>
	{/if}
{/snippet}

{@render related('Related Research', research)}
{@render related('Related Courses', courses)}

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
