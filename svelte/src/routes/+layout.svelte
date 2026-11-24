<script>
	import './layout.css';
	import 'nprogress/nprogress.css';
	import NProgress from 'nprogress';
	import { onMount } from 'svelte';
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import favicon from '#lib/assets/favicon.svg';
	import { openSearch, opensSearch } from '#lib/searchOverlay.js';
	import { keepFonts } from '#lib/fonts.js';
	import Logo from '#lib/components/Logo.svelte';
	import DesktopNav from '#lib/components/layout/DesktopNav.svelte';
	import Explore from '#lib/components/layout/Explore.svelte';
	import Footer from '#lib/components/layout/Footer.svelte';
	import HomeHero from '#lib/components/layout/HomeHero.svelte';
	import MobileMenu from '#lib/components/layout/MobileMenu.svelte';
	import MobileOnThisPage from '#lib/components/layout/MobileOnThisPage.svelte';
	import Seo from '#lib/components/layout/Seo.svelte';
	import SearchOverlay from '#lib/components/layout/SearchOverlay.svelte';
	import Sidebar from '#lib/components/layout/Sidebar.svelte';

	let { children, data } = $props();

	let home = $derived(page.route.id === '/');
	// Search at its own URL has the screen to itself, as it does over a page
	let searchPage = $derived(page.route.id === '/search' && !page.error);
	let onThisPage = $derived(page.data.onThisPage ?? []);
	// Explore's height, for the logo to stop above it
	let exploreHeight = $state(0);

	NProgress.configure({ showSpinner: false });

	onMount(keepFonts);

	// Finishes on `complete` rather than in afterNavigate, which doesn't run
	// when a navigation is cancelled or fails, leaving the bar stuck. Query
	// changes made in code on the same page load nothing, so they skip it.
	beforeNavigate((navigation) => {
		const { willUnload, type, from, to, complete, cancel } = navigation;
		if (willUnload || (type === 'goto' && from?.url.pathname === to?.url.pathname)) return;
		NProgress.start();
		const done = () => NProgress.done();
		if (opensSearch(navigation)) {
			cancel();
			openSearch(to.url).then(done, done);
		} else {
			complete.then(done, done);
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Seo defaults={data.seo} />

{#if searchPage}
	{@render children()}
{:else}
	<!-- The nav holds no space of its own and sticks over the content's
	     columns for the whole page, over the homepage's hero first -->
	<DesktopNav navigation={data.navigation} class="lg:ml-(--sidebar-column)" />
	{#if home}
		<HomeHero slides={page.data.homepage?.heroSlides ?? []} />
	{/if}

	<!-- From lg: the sidebar's column beside a 9-column content grid -->
	<div class="shell" style:--explore-height="{exploreHeight}px">
		<Sidebar links={onThisPage} />
		<div class="min-w-0 px-xs lg:col-start-2 lg:row-start-1 lg:flex lg:flex-col">
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
			<main
				class={[
					'lg:grid lg:grid-cols-9 lg:content-start lg:gap-x-xs',
					home ? 'lg:pt-xs' : 'lg:pt-[5.8rem]'
				]}
			>
				{@render children()}
			</main>
			{#if onThisPage.length}
				<MobileOnThisPage links={onThisPage} />
			{/if}
			<!-- On a short page, at the foot, clear of the logo -->
			<Explore links={data.explore} bind:height={exploreHeight} class="lg:mt-auto" />
		</div>
	</div>

	<Footer footer={data.footer} />
{/if}

{#if page.state.search}
	<SearchOverlay search={page.state.search} />
{/if}
