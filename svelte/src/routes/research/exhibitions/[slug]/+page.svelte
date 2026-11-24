<script>
	import DetailPage from '#lib/components/DetailPage.svelte';
	import ResearchSection from '#lib/components/ResearchSection.svelte';
	import { formatDates, researchTypes } from '#lib/research.js';

	let { data } = $props();

	let page = $derived(data.page);
</script>

<DetailPage
	{page}
	lines={[formatDates(page), page.location].filter(Boolean)}
	tags={[researchTypes.exhibition.tag, ...(page.fields ?? [])]}
	smallHeadings
>
	<ResearchSection heading="Related Research" items={page.related} />
	<ResearchSection heading="More Exhibitions" items={page.more} />
</DetailPage>
