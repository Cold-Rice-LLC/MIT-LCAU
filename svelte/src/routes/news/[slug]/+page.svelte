<script>
	import NewsCards from '#lib/components/NewsCards.svelte';
	import Section from '#lib/components/Section.svelte';
	import Modules from '#lib/components/modules/Modules.svelte';
	import { formatDate } from '#lib/dates.js';

	let { data } = $props();

	let post = $derived(data.post);
</script>

<!-- The title and date, with 12px more than a section's gap below (24px
     from lg) -->
<header class="col-span-full end-gap pt-[6rem] pb-xs text-center lg:pt-3xl lg:pb-md">
	<h1 class="text-h1 text-trim">{post.title}</h1>
	<time datetime={post.date} class="mt-lg block text-body-lg text-trim lg:mt-xl">
		{formatDate(post.date)}
	</time>
</header>

<Modules modules={post.modules} />

{#if data.more.length}
	<Section heading="More News">
		<NewsCards posts={data.more} />
	</Section>
{/if}
