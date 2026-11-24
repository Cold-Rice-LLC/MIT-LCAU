<script>
	import { page } from '$app/state';
	import Chevron from '#lib/components/icons/Chevron.svelte';
	import Close from '#lib/components/icons/Close.svelte';
	import { Disclosure } from '#lib/disclosure.svelte.js';
	import { refineHref } from '#lib/url.js';

	/**
	 * Figma's D - Dropdown: a filter's name on a grey button that opens a
	 * panel of its options, each a link that sets `param` in the URL to its
	 * value. The current one, whose value is `value`, is purple with a close
	 * mark and clears it. Choosing one closes it, as do Escape and a click
	 * anywhere else.
	 */
	let { label, param, options, value } = $props();

	const id = $props.id();

	const disclosure = new Disclosure();
</script>

<div {@attach disclosure.attach} class="lg:relative">
	<button
		type="button"
		aria-expanded={disclosure.open}
		aria-controls={id}
		class="flex items-center gap-[1rem] button text-control"
		onclick={disclosure.toggle}
	>
		<span class="text-trim">{label}</span>
		<Chevron class={disclosure.open && 'rotate-180'} />
	</button>
	<ul {id} hidden={!disclosure.open} class="text-control">
		{#each options as option (option.value)}
			{@const selected = option.value === value}
			<li>
				<a
					href={refineHref(page.url, { [param]: selected ? null : option.value })}
					aria-current={selected ? 'true' : undefined}
					class={[
						'flex items-center gap-[0.8rem] py-2xs leading-[1.1] hover:text-highlight',
						selected && 'text-highlight'
					]}
					onclick={disclosure.close}
				>
					{#if selected}
						<Close class="size-[1.4rem] shrink-0" />
					{/if}
					{option.label}
				</a>
			</li>
		{/each}
	</ul>
</div>

<style>
	/* 10px under the button; across the page on phones */
	ul {
		position: absolute;
		inset: 100% 0 auto;
		z-index: 20;
		max-height: 60svh;
		margin-top: 1rem;
		padding: var(--spacing-2xs) var(--spacing-xs);
		border-radius: var(--radius-def);
		background-color: var(--color-ui);
		overflow-y: auto;

		@media (width >= 1024px) {
			right: auto;
			width: 33.9rem;
		}
	}
</style>
