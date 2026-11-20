<script>
	import { page } from '$app/state';
	import AppLink from '#lib/components/AppLink.svelte';
	import Logo, { LOGO_STEPS } from '#lib/components/Logo.svelte';
	import MitWordmark from '#lib/components/icons/MitWordmark.svelte';
	import PlainText from '#lib/components/PlainText.svelte';

	/**
	 * The dark panel at the foot of every page: logo, newsletter signup and
	 * a group of links, a two-column sitemap, and contact details: sections
	 * #1–#3 of the footer in Site Settings. One column on mobile; from lg,
	 * an 11-column grid split 2, 3, 3, 3.
	 */
	let { footer } = $props();

	let { newsletterHeading, linksHeading, links, sitemapHeading, sitemap, contactHeading, contact } =
		$derived(footer);

	// Hovering the logo takes its words back to the initials a step at a
	// time, then shows the full name; leaving runs them back out. Timed
	// from the designers' screen recording.
	const STEP_MS = 40;
	let logoStep = $state(LOGO_STEPS);
	let logoTarget = $state(LOGO_STEPS);

	const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

	const animateLogo = (target) => {
		logoTarget = target;
		if (reducedMotion()) logoStep = target;
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
		scrollTo({ top: 0, behavior: reducedMotion() ? 'instant' : 'smooth' });
	};
</script>

{#snippet heading(text, className)}
	<h2 class={['text-[2rem] leading-[1.1] tracking-[-0.02em] text-trim', className]}>{text}</h2>
{/snippet}

<footer class="px-xs pb-xs">
	<div class="flex flex-col gap-xl rounded-def bg-charcoal p-xs text-white">
		<div
			class="flex flex-col gap-xl text-[1.6rem] leading-[1.25] lg:grid lg:grid-cols-11 lg:gap-xs lg:leading-[1.2] lg:*:pr-xs lg:*:pb-md"
		>
			<a
				href="/"
				aria-label="MIT Norman B. Leventhal Center for Advanced Urbanism, home"
				class="@container lg:col-span-2"
				onclick={toTop}
				onmouseenter={() => animateLogo(1)}
				onmouseleave={() => animateLogo(LOGO_STEPS)}
				onfocus={() => animateLogo(1)}
				onblur={() => animateLogo(LOGO_STEPS)}
			>
				<!-- The logo's square is 5.52em: from lg it fills its two columns,
				     up to Figma's 276px -->
				<Logo step={logoStep} class="text-[2.92rem] lg:text-[min(5rem,18.1cqi)]" />
			</a>

			<div class="flex flex-col gap-xl lg:col-span-3">
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
								<li><AppLink {link} class="transition-opacity duration-200 hover:opacity-50" /></li>
							{/each}
						</ul>
					</div>
				{/if}
			</div>

			<nav aria-label="Sitemap" class="flex flex-col gap-md lg:col-span-3">
				{#if sitemapHeading}{@render heading(sitemapHeading)}{/if}
				<div class="grid grid-cols-2 gap-xs">
					{#each sitemap as column, i (i)}
						<div><PlainText value={column} /></div>
					{/each}
				</div>
			</nav>

			<div class="flex flex-col gap-xs text-body lg:col-span-3 lg:gap-md">
				{#if contactHeading}{@render heading(contactHeading, 'hidden lg:block')}{/if}
				<a
					href="https://www.mit.edu/"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Massachusetts Institute of Technology"
					class="w-[13.1rem] self-start transition-opacity duration-200 hover:opacity-50 lg:w-[21.7rem]"
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
