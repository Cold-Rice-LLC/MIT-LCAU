<script>
	import AppLink from '#lib/components/AppLink.svelte';
	import LogoLink from '#lib/components/LogoLink.svelte';
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
</script>

{#snippet heading(text, className)}
	<h2 class={['text-h4 text-trim', className]}>{text}</h2>
{/snippet}

<footer class="px-xs pb-xs">
	<div class="flex flex-col gap-xl rounded-def bg-charcoal p-xs text-white">
		<div
			class="sections flex flex-col gap-xl text-[1.6rem] leading-[1.25] lg:grid lg:gap-xs lg:leading-[1.2] lg:*:pr-xs lg:*:pb-md"
		>
			<!-- The link fills its column; only the square takes the pointer:
			     hover, cursor and click -->
			<LogoLink
				class="pointer-events-none text-[2.92rem] lg:self-start lg:text-(length:--logo-size)"
				logoClass="pointer-events-auto"
			/>

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
						class="flex h-[3.8rem] rounded-def bg-white/5 text-h4 focus-within:outline-2 focus-within:outline-white lg:h-[3.1rem] lg:text-[1.6rem]"
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
	/* From lg, one row: the logo's column (--logo-column, shared with the
	   sidebar so the sections line up with the content grid above), and
	   the three sections share the rest */
	.sections {
		@media (width >= 1024px) {
			grid-template-columns: var(--logo-column) repeat(3, minmax(0, 1fr));
		}
	}
</style>
