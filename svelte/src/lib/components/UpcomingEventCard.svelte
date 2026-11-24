<script>
	import AppLink from '#lib/components/AppLink.svelte';
	import EventFacts from '#lib/components/EventFacts.svelte';
	import ImageFrame from '#lib/components/ImageFrame.svelte';
	import Tag from '#lib/components/Tag.svelte';

	/**
	 * An upcoming event on the Events landing, unboxed: its type and
	 * Upcoming as tags, a 3:2 image, its title, and its date and location
	 * side by side (queried with eventCard).
	 */
	let { event } = $props();
</script>

<AppLink link={event.link} class="flex flex-col">
	<span class="flex gap-xs">
		<Tag label={event.type} />
		<Tag label="Upcoming" class="text-upcoming" />
	</span>
	<ImageFrame
		as="span"
		image={event.image}
		aspect={3 / 2}
		sizes="(width >= 1024px) 40vw, 100vw"
		class="mt-xs rounded-def"
	/>
	<span class="mt-sm text-h3 text-trim lg:leading-[1.1]">{event.title}</span>
	<dl class="mt-md grid grid-cols-2 gap-xs lg:mt-lg">
		<EventFacts {event} class="gap-xs" valueClass="leading-[1.1]" />
	</dl>
</AppLink>
