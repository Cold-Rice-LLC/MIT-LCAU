import { dev } from '$app/environment';
import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
	projectId: 'ztsecwdy',
	dataset: 'production',
	apiVersion: '2026-10-20',
	// Live from the API locally, so edits show on reload; cached on the site
	useCdn: !dev
});

const builder = createImageUrlBuilder(client);

export const urlFor = (source) => {
	return builder.image(source);
};
