<script>
	/** A large pull quote across the middle 7 columns, and who said it. */
	let { quote, attribution } = $props();
</script>

<figure class="flex flex-col gap-md lg:col-span-7 lg:col-start-2">
	<blockquote class="text-h3 whitespace-pre-line text-trim">{quote}</blockquote>
	{#if attribution}
		<figcaption class="text-body text-trim">{attribution}</figcaption>
	{/if}
</figure>
