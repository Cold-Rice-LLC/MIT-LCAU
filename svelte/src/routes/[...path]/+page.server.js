import { error } from '@sveltejs/kit';
import { client } from '#lib/sanity/client.js';
import { portableTextFields } from '#lib/sanity/links.js';
import { modulesFields } from '#lib/sanity/modules.js';
import { pageSeo, seoFields } from '#lib/sanity/seo.js';

// Any page under "All pages" in the Studio, by slug. The homepage has its
// own route, so it's left out here.
export async function load({ params }) {
	const page = await client.fetch(
		`*[_type == "page" && slug.current == $slug && _id != "homepage"][0]{
			title,
			headline,
			intro[]{ ${portableTextFields} },
			modules[]{ ${modulesFields} },
			${seoFields}
		}`,
		{ slug: params.path }
	);

	if (!page) error(404, 'Not found');

	return { page, seo: pageSeo(page.seo, { title: page.title }) };
}
