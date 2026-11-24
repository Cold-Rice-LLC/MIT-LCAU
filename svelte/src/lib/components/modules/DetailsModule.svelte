<script>
	import Buttons from '#lib/components/Buttons.svelte';
	import RichText from '#lib/components/RichText.svelte';

	/** Groups of small text in the paragraph column, each with its heading and buttons. */
	let { groups = [], heading } = $props();
</script>

<div class="col-span-full measure flex flex-col gap-lg lg:gap-xl">
	{#each groups as group (group._key)}
		<div class="flex flex-col gap-md">
			{#if group.heading}
				<svelte:element this={heading ? 'h3' : 'h2'} class="text-h4 text-trim">
					{group.heading}
				</svelte:element>
			{/if}
			{#if group.text?.length}
				<RichText value={group.text} class="text-body" />
			{/if}
			<Buttons links={group.links} />
		</div>
	{/each}
</div>
