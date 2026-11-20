<script>
	import Logo from '#lib/components/Logo.svelte';
	import MitLink from '#lib/components/layout/MitLink.svelte';
</script>

<!-- Desktop only: the logo and MIT link, held in view as the page scrolls -->
<aside class="sticky top-0 hidden h-svh flex-col gap-xs self-start py-xs pl-xs lg:flex">
	<a
		href="/"
		aria-label="MIT Norman B. Leventhal Center for Advanced Urbanism, home"
		class="rounded-def bg-charcoal p-xs pb-[1.6rem] text-[5rem] text-white"
	>
		<Logo />
	</a>
	<MitLink class="mt-auto" />
</aside>
