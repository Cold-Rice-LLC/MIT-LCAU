<script>
	import { page } from '$app/state';
	import { prefersReducedMotion } from 'svelte/motion';
	import AppLink from '#lib/components/AppLink.svelte';
	import Logo, { LOGO_STEPS } from '#lib/components/Logo.svelte';
	import MitWordmark from '#lib/components/icons/MitWordmark.svelte';
	import PlainText from '#lib/components/PlainText.svelte';

	/**
	 * The dark panel at the foot of every page: logo, newsletter signup and
	 * a group of links, a sitemap (two columns from lg), and contact
	 * details: sections #1–#3 of the footer in Site Settings. One column on
	 * mobile; from lg, one row (see the style block).
	 */
	let { footer } = $props();

	let { newsletterHeading, linksHeading, links, sitemapHeading, sitemap, contactHeading, contact } =
		$derived(footer);

	// Hovering the logo takes its words back to the initials a step at a
	// time, then shows the full name; leaving runs them back out. Timed
	// from the designers' screen recording, slowed by 20%.
	const STEP_MS = 48;
	let logoStep = $state(LOGO_STEPS);
	let logoTarget = $state(LOGO_STEPS);

	const animateLogo = (target) => {
		logoTarget = target;
		if (prefersReducedMotion.current) logoStep = target;
	};

	$effect(() => {
		if (logoStep === logoTarget) return;
		const timer = setTimeout(() => (logoStep += Math.sign(logoTarget - logoStep)), STEP_MS);
		return () => clearTimeout(timer);
	});

	// Already on the homepage, the logo scrolls back to the top instead
	const toTop = (event) => {
		if (page.url.pathname !== '/') return;
		event.preventDefault();
		scrollTo({ top: 0, behavior: prefersReducedMotion.current ? 'instant' : 'smooth' });
	};
</script>

{#snippet heading(text, className)}
	<h2 class={['text-[2rem] leading-[1.1] tracking-[-0.02em] text-trim', className]}>{text}</h2>
{/snippet}

<footer class="px-xs pb-xs">
	<div class="@container flex flex-col gap-xl rounded-def bg-charcoal p-xs text-white">
		<div
			class="sections flex flex-col gap-xl text-[1.6rem] leading-[1.25] lg:grid lg:gap-xs lg:leading-[1.2] lg:*:pr-xs lg:*:pb-md"
		>
			<a
				href="/"
				aria-label="MIT Norman B. Leventhal Center for Advanced Urbanism, home"
				class="home pointer-events-none lg:self-start"
				onclick={toTop}
				onmouseenter={() => animateLogo(1)}
				onmouseleave={() => animateLogo(LOGO_STEPS)}
				onfocus={() => animateLogo(1)}
				onblur={() => animateLogo(LOGO_STEPS)}
			>
				<!-- The link fills its column; only the square takes the pointer:
				     hover, cursor and click -->
				<Logo step={logoStep} class="pointer-events-auto" />
			</a>

			<div class="flex flex-col gap-xl">
				<form
					class="flex flex-col gap-sm lg:gap-md"
					onsubmit={(event) => {
						// Not connected to Mailchimp yet
						event.preventDefault();
					}}
				>
					{#if newsletterHeading}{@render heading(newsletterHeading)}{/if}
					<div
						class="flex h-[3.8rem] rounded-def bg-white/5 text-[2rem] leading-[1.1] tracking-[-0.02em] focus-within:outline-2 focus-within:outline-white lg:h-[3.1rem] lg:text-[1.6rem]"
					>
						<label for="newsletter-email" class="sr-only">Email address</label>
						<input
							id="newsletter-email"
							type="email"
							name="email"
							autocomplete="email"
							required
							placeholder="Enter Email"
							class="min-w-0 flex-1 bg-transparent pl-[1.6rem] outline-none placeholder:text-white/40 lg:pl-xs"
						/>
						<button class="px-[1.6rem] lg:px-xs">Join</button>
					</div>
				</form>

				{#if links.length}
					<div class="flex flex-col gap-md">
						{#if linksHeading}{@render heading(linksHeading)}{/if}
						<ul>
							{#each links as link (link._key)}
								<li><AppLink {link} class="hover-fade" /></li>
							{/each}
						</ul>
					</div>
				{/if}
			</div>

			<nav aria-label="Sitemap" class="flex flex-col gap-md">
				{#if sitemapHeading}{@render heading(sitemapHeading)}{/if}
				<div class="grid gap-xs lg:grid-cols-2">
					{#each sitemap as column, i (i)}
						<div><PlainText value={column} truncate /></div>
					{/each}
				</div>
			</nav>

			<div class="flex flex-col gap-xs text-body lg:gap-md">
				{#if contactHeading}{@render heading(contactHeading, 'hidden lg:block')}{/if}
				<a
					href="https://www.mit.edu/"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Massachusetts Institute of Technology"
					class="w-[13.1rem] self-start hover-fade lg:w-[21.7rem]"
				>
					<MitWordmark class="block w-full" />
				</a>
				{#if contact.length}
					<address class="not-italic"><PlainText value={contact} /></address>
				{/if}
			</div>
		</div>

		<p class="text-body tracking-slight">
			© 1974–{new Date().getFullYear()} MIT Norman B. Leventhal Center for Advanced Urbanism. All Rights
			Reserved.
		</p>
	</div>
</footer>

<style>
	/* From lg, one row: the logo's column is 18% of the panel's width (cqi),
	   kept between 21.2rem and Figma's 276px square plus the column's
	   padding, and the three sections share the rest */
	.sections {
		@media (width >= 1024px) {
			--logo-column: clamp(21.2rem, 18cqi, 28.8rem);
			grid-template-columns: var(--logo-column) repeat(3, minmax(0, 1fr));
		}
	}

	/* The logo's square is 5.52em, so this sizes it: from lg, its column
	   less the padding */
	.home {
		font-size: 2.92rem;

		@media (width >= 1024px) {
			font-size: calc((var(--logo-column) - var(--spacing-xs)) / 5.52);
		}
	}
</style>
