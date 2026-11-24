<script>
	import { page } from '$app/state';
	import { prefersReducedMotion } from 'svelte/motion';
	import Logo, { LOGO_STEPS } from '#lib/components/Logo.svelte';

	/**
	 * The full logo as a link home, in the sidebar and the footer. Hovering
	 * or focusing it takes its words back to the initials a step at a time,
	 * then shows the full name; leaving runs them back out. Timed from the
	 * designers' screen recording, slowed by 20%. Already on the homepage,
	 * it scrolls back to the top instead, unless search results are over it. Size it with a font-size on
	 * `class`; `logoClass` goes on the logo itself.
	 */
	let { class: className, logoClass } = $props();

	const STEP_MS = 48;
	let step = $state(LOGO_STEPS);
	let target = $state(LOGO_STEPS);

	const animate = (to) => {
		target = to;
		if (prefersReducedMotion.current) step = to;
	};

	$effect(() => {
		if (step === target) return;
		const timer = setTimeout(() => (step += Math.sign(target - step)), STEP_MS);
		return () => clearTimeout(timer);
	});

	const toTop = (event) => {
		if (page.url.pathname !== '/' || page.shallow) return;
		event.preventDefault();
		scrollTo({ top: 0, behavior: prefersReducedMotion.current ? 'instant' : 'smooth' });
	};
</script>

<a
	href="/"
	aria-label="MIT Norman B. Leventhal Center for Advanced Urbanism, home"
	class={className}
	onclick={toTop}
	onmouseenter={() => animate(1)}
	onmouseleave={() => animate(LOGO_STEPS)}
	onfocus={() => animate(1)}
	onblur={() => animate(LOGO_STEPS)}
>
	<Logo {step} class={logoClass} />
</a>
