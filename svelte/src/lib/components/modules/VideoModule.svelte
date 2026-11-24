<script>
	import ImageFrame from '#lib/components/ImageFrame.svelte';
	import { embedUrl } from '#lib/video.js';

	/**
	 * A YouTube or Vimeo video the width of the content, 16:9 and rounded,
	 * with its caption below. With a poster, the poster shows first with a
	 * purple play button, and the player loads, playing, when it's clicked;
	 * without one, the player shows its own.
	 */
	let { video, heading } = $props();

	let playing = $state(false);
	let src = $derived(embedUrl(video?.url, playing));
</script>

{#if src}
	<figure class="col-span-full">
		<div class="relative aspect-video overflow-hidden rounded-def bg-black">
			{#if video.poster?.asset && !playing}
				<button
					type="button"
					aria-label="Play {heading ?? 'video'}"
					onclick={() => (playing = true)}
					class="size-full"
				>
					<ImageFrame
						as="span"
						image={video.poster}
						aspect={16 / 9}
						sizes="80vw"
						class="size-full"
					/>
					<svg aria-hidden="true" viewBox="0 0 32 32" fill="currentColor" class="play">
						<path d="M29.8 16 2.2 32V0Z" />
					</svg>
				</button>
			{:else}
				<iframe
					{src}
					title={heading ?? video.caption ?? 'Video'}
					allow="autoplay; fullscreen; picture-in-picture"
					allowfullscreen
					class="size-full"
				></iframe>
			{/if}
		</div>
		{#if video.caption}
			<figcaption class="mt-xs text-body text-trim">{video.caption}</figcaption>
		{/if}
	</figure>
{/if}

<style>
	/* Figma's D - Video Buttons: a white triangle in a purple square, centred */
	.play {
		position: absolute;
		top: 50%;
		left: 50%;
		box-sizing: content-box;
		width: 2.4rem;
		padding: var(--spacing-xs);
		border-radius: var(--radius-def);
		background-color: var(--color-highlight);
		color: var(--color-white);
		filter: drop-shadow(0 0 0.25rem rgb(0 0 0 / 0.3));
		transform: translate(-50%, -50%);

		@media (width >= 1024px) {
			width: 3.2rem;
			padding: var(--spacing-sm);
		}
	}
</style>
