<script>
	import { page } from '$app/state';
</script>

<!-- Spaced like a PageTitle -->
<header class="col-span-full page-top pb-2xl text-center text-h2 text-trim lg:pb-[12rem]">
	<h1>
		{page.status === 404 ? 'The page you are looking for does not exist.' : 'Something went wrong.'}
	</h1>
	<p>Back to <a href="/" class="underline decoration-[0.08em] hover-fade">homepage</a>.</p>
</header>
