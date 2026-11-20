<script>
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import Logo from '#lib/components/Logo.svelte';
	import DesktopNav from '#lib/components/layout/DesktopNav.svelte';
	import Explore from '#lib/components/layout/Explore.svelte';
	import Footer from '#lib/components/layout/Footer.svelte';
	import MobileMenu from '#lib/components/layout/MobileMenu.svelte';
	import Seo from '#lib/components/layout/Seo.svelte';
	import Sidebar from '#lib/components/layout/Sidebar.svelte';

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Seo defaults={data.seo} />

<div class="lg:grid lg:grid-cols-[31.2rem_1fr]">
	<Sidebar />
	<div class="min-w-0 px-xs">
		<a
			href="/"
			aria-label="MIT Norman B. Leventhal Center for Advanced Urbanism, home"
			class="flex items-center gap-xs pt-xs lg:hidden"
		>
			<Logo short class="box-content rounded-def bg-black p-[0.7rem] text-[2.4rem] text-white" />
			<span aria-hidden="true" class="text-[2rem] leading-[1.1] tracking-[-0.02em]">
				MIT Norman B.<br />Leventhal Center for<br />Advanced Urbanism
			</span>
		</a>
		<MobileMenu navigation={data.navigation} />
		<DesktopNav navigation={data.navigation} />
		<main>
			{@render children()}
		</main>
		<Explore links={data.explore} />
	</div>
</div>

<Footer navigation={data.navigation} footer={data.footer} />
