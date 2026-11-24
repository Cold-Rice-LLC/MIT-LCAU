<script>
	import PageTitle from '#lib/components/PageTitle.svelte';
	import Pagination from '#lib/components/Pagination.svelte';
	import PersonCards from '#lib/components/PersonCards.svelte';
	import RefineBar from '#lib/components/RefineBar.svelte';

	let { data } = $props();

	const sorts = [
		{ label: 'Name A–Z', value: null },
		{ label: 'Name Z–A', value: 'desc' }
	];
</script>

<PageTitle>{data.headline}</PageTitle>

<RefineBar
	count="{data.total} {data.total === 1 ? 'person' : 'people'}"
	filter={{
		label: 'Role',
		name: 'Roles',
		param: 'role',
		options: data.roles,
		value: data.role?.value ?? null
	}}
	links={[{ label: 'Sort', param: 'sort', options: sorts, value: data.sort }]}
	query={data.query}
	placeholder="Search name, or title"
/>

{#if data.people.length}
	<PersonCards people={data.people} role={data.role?._id} class="mt-xl last:mb-xl" />
{:else}
	<p class="col-span-full my-xl text-body-lg">
		{data.query ? `No one matches “${data.query}”.` : 'No one yet.'}
	</p>
{/if}

<Pagination page={data.page} pageCount={data.pageCount} class="col-span-full my-xl" />
