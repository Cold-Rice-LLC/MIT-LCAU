import { client } from '#lib/sanity/client.js';
import { imageFields } from '#lib/sanity/images.js';
import { internalFields, linkFields } from '#lib/sanity/links.js';

export async function load() {
	const settings = await client.fetch(`
		*[_id == "siteSettings"][0]{
			siteTitle,
			metaDescription,
			ogImage{ ${imageFields} },
			navigation[]{
				_key,
				title,
				"landing": landing->{ ${internalFields} },
				links[]{ _key, ${linkFields} }
			},
			explore[]{
				_key,
				link{ ${linkFields} },
				description,
				image{ ${imageFields} }
			},
			otherLinks[]{ _key, ${linkFields} },
			socialLinks[]{ _key, ${linkFields} },
			address,
			phone,
			email
		}
	`);

	return {
		// What pages fall back to for their head tags
		seo: {
			siteTitle: settings?.siteTitle,
			description: settings?.metaDescription,
			image: settings?.ogImage
		},
		navigation: settings?.navigation ?? [],
		explore: settings?.explore ?? [],
		footer: {
			otherLinks: settings?.otherLinks ?? [],
			socialLinks: settings?.socialLinks ?? [],
			address: settings?.address,
			phone: settings?.phone,
			email: settings?.email
		}
	};
}
