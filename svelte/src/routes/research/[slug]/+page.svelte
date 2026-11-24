<script>
	import DetailPage from '#lib/components/DetailPage.svelte';
	import ResearchSection from '#lib/components/ResearchSection.svelte';
	import { researchTypes } from '#lib/research.js';

	let { data } = $props();

	let page = $derived(data.page);
</script>

<DetailPage
	{page}
	lines={page.year ? [page.year] : []}
	tags={[researchTypes.research.tag, ...(page.fields ?? [])]}
	smallHeadings
>
	<ResearchSection heading="Related Research" items={data.related} />
</DetailPage>
