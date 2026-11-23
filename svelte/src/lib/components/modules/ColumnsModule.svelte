<script>
	import RichText from '#lib/components/RichText.svelte';

	/** Two or three columns of text side by side, stacked on phones. */
	let { columns = [] } = $props();
</script>

<div
	class={[
		'col-span-full grid gap-lg lg:gap-xs',
		columns.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
	]}
>
	{#each columns as column (column._key)}
		<div class="flex flex-col gap-md">
			{#if column.heading}
				<h3 class="text-h4 text-trim">{column.heading}</h3>
			{/if}
			<RichText value={column.text} class="text-[1.6rem] leading-[1.2]" />
		</div>
	{/each}
</div>
