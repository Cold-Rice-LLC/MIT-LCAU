import { client } from '#lib/sanity/client.js';
import { imageFields } from '#lib/sanity/images.js';
import { internalFields, linkFields, portableTextFields } from '#lib/sanity/links.js';

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
			section1NewsletterHeading,
			section1LinksHeading,
			section1Links[]{ _key, ${linkFields} },
			section2Heading,
			section2LinksColumn1[]{ ${portableTextFields} },
			section2LinksColumn2[]{ ${portableTextFields} },
			section3Heading,
			section3Text[]{ ${portableTextFields} }
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
			newsletterHeading: settings?.section1NewsletterHeading,
			linksHeading: settings?.section1LinksHeading,
			links: settings?.section1Links ?? [],
			sitemapHeading: settings?.section2Heading,
			sitemap: [settings?.section2LinksColumn1 ?? [], settings?.section2LinksColumn2 ?? []],
			contactHeading: settings?.section3Heading,
			contact: settings?.section3Text ?? []
		}
	};
}
