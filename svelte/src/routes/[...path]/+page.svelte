<script>
	import PageIntro from '#lib/components/PageIntro.svelte';
	import Modules from '#lib/components/modules/Modules.svelte';

	let { data } = $props();

	let { title, headline, subtitle, intro, modules } = $derived(data.page);
</script>

<PageIntro {title} {headline} {subtitle} {intro} />

<Modules {modules} />
