<script>
	import AppLink from '#lib/components/AppLink.svelte';
	import EventFacts from '#lib/components/EventFacts.svelte';
	import ImageFrame from '#lib/components/ImageFrame.svelte';
	import Tag from '#lib/components/Tag.svelte';
	import { formatWhen, typeLabel } from '#lib/events.js';

	/**
	 * Figma's D - Card - List: an event as a row on orange, its image, its
	 * type and title, then its date and location in columns from lg. On
	 * phones the date sits under the title instead, and the location is
	 * left out (queried with eventCard).
	 */
	let { event } = $props();
</script>

<AppLink
	link={event.link}
	class="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-xs rounded-def bg-orange p-[0.9rem] lg:grid-cols-[209fr_691fr_444fr] lg:p-xs"
>
	<ImageFrame
		as="span"
		image={event.image}
		aspect={3 / 2}
		sizes="(width >= 1024px) 15vw, 33vw"
		class="mix-blend-multiply"
	/>
	<span class="flex min-w-0 flex-col gap-xs lg:gap-sm">
		<Tag label={typeLabel(event.type)} />
		<span class="line-clamp-2 text-body-lg text-trim-clipped lg:text-h3">{event.title}</span>
		<span class="text-body text-trim lg:hidden">{formatWhen(event.start, event.end)}</span>
	</span>
	<dl class="hidden grid-cols-2 gap-xs lg:grid">
		<EventFacts {event} valueClass="leading-[1.1] tracking-[-0.02em]" />
	</dl>
</AppLink>
