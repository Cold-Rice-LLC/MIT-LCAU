<script>
	import LogoLink from '#lib/components/LogoLink.svelte';
	import MitLink from '#lib/components/layout/MitLink.svelte';
</script>

<!-- Desktop only: the logo and MIT link in the layout's first column, each
     stuck on its own so they can stop in different places. -->

<!-- Sized like the footer's (--logo-size). Stops once the Explore links
     reach its foot, so their images never cover it: sticking ends where its
     margin box meets the foot of the page, so the margin is Explore's height
     (--explore-height, from the layout). -->
<LogoLink
	class={[
		'sticky top-xs col-start-1 row-start-1 mt-xs mb-(--explore-height) ml-xs hidden self-start justify-self-start lg:block',
		'rounded-def bg-charcoal p-xs pb-[1.6rem] text-(length:--logo-size) text-white'
	]}
/>

<!-- Held to the foot of the screen, over the Explore images, until the
     footer pushes it up. Its top margin keeps it at least a screen below the
     logo (less its own 3.81rem height and the gap) while the homepage's hero
     scrolls away. -->
<MitLink
	class={[
		'sticky bottom-xs z-10 col-start-1 row-start-1 mb-xs ml-xs hidden self-end justify-self-start lg:flex',
		'mt-[calc(100svh-var(--spacing-xs)-3.81rem)]'
	]}
/>
