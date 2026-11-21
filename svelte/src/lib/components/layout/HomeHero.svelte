<script>
	import Image from '#lib/components/Image.svelte';
	import Logo from '#lib/components/Logo.svelte';

	/**
	 * The full-screen carousel at the top of the homepage (its Hero Slides),
	 * with the logo's words stretched to its corners. The left and right
	 * halves of the screen are the previous and next buttons, wrapping
	 * around; the count and caption run along the bottom. Desktop only for
	 * now, so text-body is its 16px desktop size.
	 */
	let { slides } = $props();

	let current = $state(0);

	const go = (by) => (current = (current + by + slides.length) % slides.length);
</script>

{#if slides.length}
	<section aria-label="Featured" class="relative hidden h-svh text-white lg:block">
		{#each slides as slide, i (slide._key)}
			<Image
				image={slide}
				loading={i === 0 ? 'eager' : 'lazy'}
				class={['absolute inset-0 size-full object-cover', i !== current && 'invisible']}
			/>
		{/each}

		<Logo
			fill
			class="pointer-events-none absolute inset-0 p-[2rem] text-[6.25vw] drop-shadow-[0_0_0.6rem_rgb(0_0_0/0.25)]"
		/>

		{#if slides.length > 1}
			<button
				aria-label="Previous image"
				class="absolute inset-y-0 left-0 w-1/2 cursor-w-resize"
				onclick={() => go(-1)}
			></button>
			<button
				aria-label="Next image"
				class="absolute inset-y-0 right-0 w-1/2 cursor-e-resize"
				onclick={() => go(1)}
			></button>
		{/if}

		<p
			aria-live="polite"
			class="pointer-events-none absolute inset-x-0 bottom-0 flex gap-md px-[1.6rem] py-xs text-body whitespace-nowrap"
		>
			<span class="text-trim">{current + 1} of {slides.length}</span>
			{#if slides[current].caption}
				<span class="min-w-0 flex-1 truncate text-trim">{slides[current].caption}</span>
			{/if}
		</p>
	</section>
{/if}
