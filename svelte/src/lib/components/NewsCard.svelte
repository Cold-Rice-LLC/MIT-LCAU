<script>
	import AppLink from '#lib/components/AppLink.svelte';
	import ImageFrame from '#lib/components/ImageFrame.svelte';
	import Tag from '#lib/components/Tag.svelte';
	import { formatDate } from '#lib/dates.js';

	/**
	 * A news post, unboxed, as in Featured and More News: a tag (from lg), a
	 * 3:2 image, its title and its date (queried with newsCard).
	 */
	let { post } = $props();
</script>

<AppLink link={post.link} class="flex flex-col">
	<Tag label="News" class="hidden lg:flex" />
	<ImageFrame
		as="span"
		image={post.image}
		aspect={3 / 2}
		sizes="(width >= 1024px) 27vw, 100vw"
		class="rounded-def lg:mt-xs"
	/>
	<span class="mt-xs text-h3 text-trim lg:mt-sm">{post.title}</span>
	<span class="mt-sm text-body-lg text-trim lg:mt-md lg:leading-[1.1]">
		{formatDate(post.date)}
	</span>
</AppLink>
