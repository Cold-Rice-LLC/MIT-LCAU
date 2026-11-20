<script>
	import AppLink from '#lib/components/AppLink.svelte';
	import Logo from '#lib/components/Logo.svelte';
	import MitWordmark from '#lib/components/icons/MitWordmark.svelte';
	import { sectionHref } from '#lib/navigation.js';

	/**
	 * The dark panel at the foot of every page: logo, social links, a
	 * sitemap of the main menu plus Other Resources, and contact details.
	 * One column on mobile, four across from lg.
	 */
	let { navigation, footer } = $props();

	let { otherLinks, socialLinks, address, phone, email } = $derived(footer);

	// The sitemap's groups split evenly between its two columns, counting
	// Other Resources, rather than CSS columns balancing them by height
	let secondColumnStart = $derived(
		Math.ceil((navigation.length + (otherLinks.length ? 1 : 0)) / 2)
	);
</script>

{#snippet heading(text, className)}
	<h2 class={['text-[2rem] leading-[1.1] tracking-[-0.02em]', className]}>{text}</h2>
{/snippet}

<footer class="px-xs pb-xs">
	<div class="flex flex-col gap-xl rounded-def bg-charcoal p-xs text-white">
		<div
			class="flex flex-col gap-xl text-[1.6rem] leading-[1.25] lg:flex-row lg:gap-xs lg:leading-[1.2] lg:*:pr-xs lg:*:pb-md"
		>
			<a
				href="/"
				aria-label="MIT Norman B. Leventhal Center for Advanced Urbanism, home"
				class="text-[2.92rem] lg:w-[28.8rem] lg:text-[5rem]"
			>
				<Logo />
			</a>

			{#if socialLinks.length}
				<div class="flex flex-col gap-md lg:flex-1">
					{@render heading('Follow us')}
					<ul>
						{#each socialLinks as link (link._key)}
							<li><AppLink {link} /></li>
						{/each}
					</ul>
				</div>
			{/if}

			<nav aria-label="Sitemap" class="flex flex-col gap-md lg:flex-1">
				{@render heading('Sitemap')}
				<ul class="columns-2 gap-xs">
					{#each navigation as section, i (section._key)}
						<li
							class={[
								'break-inside-avoid pb-[1lh]',
								i === secondColumnStart && 'break-before-column'
							]}
						>
							<a href={sectionHref(section)} class="uppercase">{section.title}</a>
							<ul>
								{#each section.links ?? [] as link (link._key)}
									<li><AppLink {link} /></li>
								{/each}
							</ul>
						</li>
					{/each}
					{#if otherLinks.length}
						<li class="break-inside-avoid">
							<h3 class="uppercase">Other Resources</h3>
							<ul>
								{#each otherLinks as link (link._key)}
									<li><AppLink {link} /></li>
								{/each}
							</ul>
						</li>
					{/if}
				</ul>
			</nav>

			<div class="flex flex-col gap-xs text-body lg:flex-1 lg:gap-md">
				{@render heading('Contact', 'hidden lg:block')}
				<MitWordmark class="w-[13.1rem] lg:w-[21.7rem]" />
				<address class="not-italic">
					{#if address}<p class="whitespace-pre-line">{address}</p>{/if}
					{#if phone || email}
						<p class="mt-[1lh]">
							{#if phone}<a href="tel:{phone}" class="block">{phone}</a>{/if}
							{#if email}<a href="mailto:{email}" class="block">{email}</a>{/if}
						</p>
					{/if}
				</address>
			</div>
		</div>

		<p class="text-body tracking-slight">
			© 1974–{new Date().getFullYear()} MIT Norman B. Leventhal Center for Advanced Urbanism. All Rights
			Reserved.
		</p>
	</div>
</footer>
