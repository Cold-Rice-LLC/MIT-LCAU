<script>
	import { page } from '$app/state';
</script>

<h1 class="mb-md text-h1">{page.status === 404 ? 'Not Found' : 'Error'}</h1>
<p class="text-body-lg"><a href="/" class="underline">Back to the homepage</a></p>
