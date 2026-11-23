<script>
	import AppLink from '#lib/components/AppLink.svelte';
	import ImageFrame from '#lib/components/ImageFrame.svelte';
	import Tag from '#lib/components/Tag.svelte';

	/**
	 * Figma's D - Card - Box / M - Card - Box for a person: their first role
	 * as a tag, a square photo, their name and positions, linking to their
	 * page. The photo multiplies into the grey, as in Figma.
	 */
	let { person, class: className } = $props();
</script>

<AppLink
	link={person.link}
	class={[
		'flex h-full flex-col gap-xs rounded-def bg-ui px-[0.9rem] pt-[0.9rem] pb-xs lg:px-xs lg:pt-xs lg:pb-sm',
		className
	]}
>
	{#if person.role}
		<Tag label={person.role} />
	{/if}
	<ImageFrame
		as="span"
		image={person.photo}
		aspect={1}
		sizes="(width >= 1024px) 25vw, 50vw"
		class="mix-blend-multiply"
	/>
	<span class="text-body-lg text-trim lg:leading-[1.1] lg:tracking-[-0.02em]">
		{person.name}
	</span>
	{#if person.positions?.length}
		<span class="text-body text-trim lg:leading-[1.3] lg:tracking-slight">
			{person.positions.join('; ')}
		</span>
	{/if}
</AppLink>
