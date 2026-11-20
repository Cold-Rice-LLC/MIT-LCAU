<script>
	import AppLink from '#lib/components/AppLink.svelte';

	let { data } = $props();
</script>

<h1 class="mb-xl text-h1">{data.homepage?.title ?? 'MIT LCAU'}</h1>
<ul class="text-body-lg">
	{#each data.pages as { _id, link } (_id)}
		<li><AppLink {link} class="underline" /></li>
	{/each}
</ul>
