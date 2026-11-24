import { error } from '@sveltejs/kit';
import { pageSections } from '#lib/onThisPage.js';
import { client } from '#lib/sanity/client.js';
import { modulesFields } from '#lib/sanity/modules.js';
import { pageSeo, seoFields } from '#lib/sanity/seo.js';

/**
 * What a DetailPage needs, for the document of `type` with this slug: its
 * modules and "On this page" links, and its head tags, with whatever else
 * `fields`, a GROQ projection, asks for. A 404 without one.
 */
export const loadDetail = async (type, slug, fields = '') => {
	const doc = await client.fetch(
		`*[_type == $type && slug.current == $slug][0]{
			title,
			subtitle,
			excerpt,
			image{ asset },
			"fields": fields[]->title,
			onThisPage,
			modules[]{ ${modulesFields} },
			${seoFields},
			${fields}
		}`,
		{ type, slug }
	);

	if (!doc) error(404, 'Not found');

	return {
		...pageSections(doc),
		seo: pageSeo(doc.seo, { title: doc.title, description: doc.excerpt, image: doc.image })
	};
};
