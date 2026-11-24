import { error } from '@sveltejs/kit';
import { pageSections } from '#lib/onThisPage.js';
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
			subtitle,
			onThisPage,
			intro[]{ ${portableTextFields} },
			modules[]{ ${modulesFields} },
			${seoFields}
		}`,
		{ slug: params.path }
	);

	if (!page) error(404, 'Not found');

	const { modules, onThisPage } = pageSections(page);

	return {
		page: { ...page, modules },
		onThisPage,
		seo: pageSeo(page.seo, { title: page.title })
	};
}
