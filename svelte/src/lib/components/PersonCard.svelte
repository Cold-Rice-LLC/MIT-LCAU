<script>
	import Card from '#lib/components/Card.svelte';

	/**
	 * A person's Card: their role as the tag, a square photo, their name and
	 * positions, on grey (queried with personCard).
	 */
	let { person } = $props();
</script>

<Card
	link={person.link}
	tag={person.role}
	image={person.photo}
	aspect={1}
	title={person.name}
	meta={person.positions?.join('; ')}
	class="bg-ui"
/>
