import { client } from '#lib/sanity/client.js';
import { imageFields } from '#lib/sanity/images.js';
import { internalFields } from '#lib/sanity/links.js';
import { pageSeo, seoFields } from '#lib/sanity/seo.js';

// The homepage, and for now a list of every other page to link to
export async function load() {
	const { homepage, pages } = await client.fetch(`{
		"homepage": *[_id == "homepage"][0]{
			title,
			heroSlides[]{ ${imageFields} },
			${seoFields}
		},
		"pages": *[_type == "page" && _id != "homepage" && defined(slug.current)] | order(title asc){
			_id,
			"link": { "linkType": "internal", "label": title, "internal": { ${internalFields} } }
		}
	}`);

	// No title of its own in the head tags: the homepage is the site's title alone
	return { homepage, pages, seo: pageSeo(homepage?.seo) };
}
