<script>
	import './layout.css';
	import 'nprogress/nprogress.css';
	import NProgress from 'nprogress';
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import favicon from '#lib/assets/favicon.svg';
	import Logo from '#lib/components/Logo.svelte';
	import DesktopNav from '#lib/components/layout/DesktopNav.svelte';
	import Explore from '#lib/components/layout/Explore.svelte';
	import Footer from '#lib/components/layout/Footer.svelte';
	import HomeHero from '#lib/components/layout/HomeHero.svelte';
	import MobileMenu from '#lib/components/layout/MobileMenu.svelte';
	import Seo from '#lib/components/layout/Seo.svelte';
	import Sidebar from '#lib/components/layout/Sidebar.svelte';

	let { children, data } = $props();

	let home = $derived(page.route.id === '/');

	NProgress.configure({ showSpinner: false });

	// Finishes on `complete` rather than in afterNavigate, which doesn't run
	// when a navigation is cancelled or fails, leaving the bar stuck. Query
	// changes made in code on the same page load nothing, so they skip it.
	beforeNavigate(({ willUnload, type, from, to, complete }) => {
		if (willUnload || (type === 'goto' && from?.url.pathname === to?.url.pathname)) return;
		NProgress.start();
		const done = () => NProgress.done();
		complete.then(done, done);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Seo defaults={data.seo} />

<!-- From lg: the sidebar beside a 9-column content grid (see the style
     block). The homepage's hero spans the top row; the nav holds no space
     of its own and sticks over the grid's columns for the whole page, over
     the hero first. -->
<div class="shell">
	{#if home}
		<HomeHero slides={page.data.homepage?.heroSlides ?? []} class="col-span-full row-start-1" />
	{/if}
	<DesktopNav navigation={data.navigation} class="col-start-2 row-start-1" />
	<Sidebar class="row-start-2" />
	<div class="min-w-0 px-xs lg:row-start-2">
		<a
			href="/"
			aria-label="MIT Norman B. Leventhal Center for Advanced Urbanism, home"
			class="flex items-center gap-xs pt-xs lg:hidden"
		>
			<Logo short class="box-content rounded-def bg-black p-[0.7rem] text-[2.4rem] text-white" />
			<span aria-hidden="true" class="text-h4">
				MIT Norman B.<br />Leventhal Center for<br />Advanced Urbanism
			</span>
		</a>
		<MobileMenu navigation={data.navigation} />
		<main class={['lg:grid lg:grid-cols-9 lg:gap-xs', home ? 'lg:pt-xs' : 'lg:pt-[5.8rem]']}>
			{@render children()}
		</main>
		<Explore links={data.explore} />
	</div>
</div>

<Footer footer={data.footer} />

<style>
	/* The sidebar's column is the logo's (layout.css) plus its padding; the
	   content takes the rest */
	.shell {
		@media (width >= 1024px) {
			display: grid;
			grid-template-columns: calc(var(--logo-column) + var(--spacing-md)) minmax(0, 1fr);
		}
	}
</style>
