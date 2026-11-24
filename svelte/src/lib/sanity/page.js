import { error } from '@sveltejs/kit';
import { pageSections } from '#lib/onThisPage.js';
import { client } from '#lib/sanity/client.js';
import { buttonsFields, portableTextFields } from '#lib/sanity/links.js';
import { modulesFields } from '#lib/sanity/modules.js';
import { pageSeo, seoFields } from '#lib/sanity/seo.js';

/**
 * What a PageIntro and Modules need, for the page with this slug, and its
 * "On this page" links and head tags, with whatever else `fields`, a GROQ
 * projection, asks for. A 404 without one. The homepage has its own
 * route, so it's left out here.
 */
export const loadPage = async (slug, fields = '') => {
	const page = await client.fetch(
		`*[_type == "page" && slug.current == $slug && _id != "homepage"][0]{
			title,
			headline,
			subtitle,
			onThisPage,
			intro[]{ ${portableTextFields} },
			introLabel,
			${buttonsFields},
			modules[]{ ${modulesFields} },
			${seoFields},
			${fields}
		}`,
		{ slug }
	);

	if (!page) error(404, 'Not found');

	return { ...pageSections(page), seo: pageSeo(page.seo, { title: page.title }) };
};
