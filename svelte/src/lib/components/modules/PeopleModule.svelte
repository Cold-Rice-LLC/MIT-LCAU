<script>
	import PersonCard from '#lib/components/PersonCard.svelte';
	import RefineControl from '#lib/components/RefineControl.svelte';
	import RefineRow from '#lib/components/RefineRow.svelte';
	import RichText from '#lib/components/RichText.svelte';
	import { linkHref } from '#lib/sanity/links.js';
	import { sortPeople } from '#lib/people.js';
	import { labelSlug } from '#lib/url.js';

	/**
	 * People in a grid of four across (two on phones). As role tabs, a row
	 * of role buttons picks whose first four show, A–Z, starting with the
	 * first role, and "View All People" links to the People page filtered
	 * to that role; roles with no one yet are left out. As a grid, everyone
	 * it lists, with any text above them: A–Z when it's everyone with a
	 * role (`byRole`), else in the order picked.
	 */
	let { display, tabs = [], people = [], byRole, peoplePage, text } = $props();

	let roles = $derived(
		tabs
			.filter((tab) => tab.people.length)
			.map((tab) => ({ ...tab, people: sortPeople(tab.people).slice(0, 4) }))
	);
	let selected = $state(0);
	let gridPeople = $derived(byRole ? sortPeople(people) : people);
</script>

{#snippet grid(people)}
	<ul class="col-span-full card-grid">
		{#each people as person (person._id)}
			<li><PersonCard {person} /></li>
		{/each}
	</ul>
{/snippet}

{#if display === 'tabs'}
	{#if roles.length}
		<div class="col-span-full flex flex-col gap-xs">
			<RefineRow label="Role" class="lg:py-xs">
				{#each roles as role, i (role._id)}
					<RefineControl
						label={role.label}
						selected={i === selected}
						onclick={() => (selected = i)}
					/>
				{/each}
			</RefineRow>
			{@render grid(roles[selected].people)}
		</div>
	{/if}
	{#if peoplePage}
		<a
			href={roles.length
				? `${linkHref(peoplePage)}?role=${labelSlug(roles[selected].label)}`
				: linkHref(peoplePage)}
			class="col-span-full self-start justify-self-start cta"
		>
			View All People
		</a>
	{/if}
{:else}
	{#if text?.length}
		<RichText value={text} class="col-span-full measure text-body-lg" />
	{/if}
	{@render grid(gridPeople)}
{/if}
