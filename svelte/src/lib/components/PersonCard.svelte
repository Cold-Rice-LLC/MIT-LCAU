<script>
	import Card from '#lib/components/Card.svelte';

	/**
	 * A person's Card: their role as the tag, a square photo, their name and
	 * positions, on grey (queried with personCard). The role is their first,
	 * or the one whose _id is `role`, if they have it.
	 */
	let { person, role } = $props();

	let shownRole = $derived(person.roles?.find(({ _id }) => _id === role) ?? person.roles?.[0]);
</script>

<Card
	link={person.link}
	tag={shownRole?.title}
	image={person.photo}
	aspect={1}
	title={person.name}
	meta={person.positions?.join('; ')}
	class="bg-ui"
/>
