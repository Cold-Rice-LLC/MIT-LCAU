import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
	projectId: 'ztsecwdy',
	dataset: 'production',
	apiVersion: '2026-10-20',
	useCdn: true
});

const builder = createImageUrlBuilder(client);

export const urlFor = (source) => {
	return builder.image(source);
};
