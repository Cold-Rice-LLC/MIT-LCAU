<script>
	import PageIntro from '#lib/components/PageIntro.svelte';
	import Modules from '#lib/components/modules/Modules.svelte';

	let { data } = $props();
</script>

<PageIntro {...data.page} />

<Modules modules={data.page.modules} />
