<script>
	import AppLink from '#lib/components/AppLink.svelte';
	import PersonCard from '#lib/components/PersonCard.svelte';
	import RichText from '#lib/components/RichText.svelte';
	import Tag from '#lib/components/Tag.svelte';
	import Close from '#lib/components/icons/Close.svelte';

	/**
	 * People in a grid of four across (two on phones). As role tabs, a row
	 * of role buttons picks whose first four show, starting with the first
	 * role, and "View All People" links to the People page; roles with no
	 * one yet are left out. As a grid, everyone it lists, with any text
	 * above them.
	 */
	let { display, tabs = [], people = [], peoplePage, text } = $props();

	let roles = $derived(tabs.filter((tab) => tab.people.length));
	let selected = $state(0);
</script>

{#snippet grid(people)}
	<ul class="col-span-full grid grid-cols-2 gap-xs lg:grid-cols-4">
		{#each people as person (person._id)}
			<li><PersonCard {person} /></li>
		{/each}
	</ul>
{/snippet}

{#if display === 'tabs'}
	{#if roles.length}
		<div class="col-span-full flex flex-col gap-xs">
			<div class="flex items-start gap-xs lg:py-xs">
				<p class="shrink-0 py-[1rem] text-label text-trim">Role</p>
				<div class="flex gap-xs overflow-x-auto lg:flex-wrap">
					{#each roles as role, i (role._id)}
						<button
							aria-pressed={i === selected}
							class={[
								'flex shrink-0 items-center gap-xs button',
								i === selected ? 'bg-highlight text-white' : 'bg-ui'
							]}
							onclick={() => (selected = i)}
						>
							<Tag label={role.label} />
							{#if i === selected}
								<Close />
							{/if}
						</button>
					{/each}
				</div>
			</div>
			{@render grid(roles[selected].people)}
		</div>
	{/if}
	{#if peoplePage}
		<AppLink link={peoplePage} class="col-span-full self-start justify-self-start cta">
			View All People
		</AppLink>
	{/if}
{:else}
	{#if text?.length}
		<RichText value={text} class="col-span-full measure text-body-lg" />
	{/if}
	{@render grid(people)}
{/if}
