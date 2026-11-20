<script>
	import LogoLink from '#lib/components/LogoLink.svelte';
	import MitLink from '#lib/components/layout/MitLink.svelte';

	let { class: className } = $props();
</script>

<!-- Desktop only: the logo and MIT link, a screen tall and held in view as
     the page scrolls. The logo takes the shared --logo-size (layout.css), so
     it matches the footer's. -->
<aside
	class={['sticky top-0 hidden h-svh flex-col gap-xs self-start py-xs pl-xs lg:flex', className]}
>
	<LogoLink
		class="self-start rounded-def bg-charcoal p-xs pb-[1.6rem] text-(length:--logo-size) text-white"
	/>
	<MitLink class="mt-auto" />
</aside>
