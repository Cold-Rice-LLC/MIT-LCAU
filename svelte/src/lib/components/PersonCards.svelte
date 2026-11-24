<script>
	import PersonCard from '#lib/components/PersonCard.svelte';

	/** People four across, two on phones. `role` passes to PersonCard. */
	let { people, role, class: className } = $props();
</script>

<ul class={['col-span-full card-grid', className]}>
	{#each people as person (person._id)}
		<li><PersonCard {person} {role} /></li>
	{/each}
</ul>
