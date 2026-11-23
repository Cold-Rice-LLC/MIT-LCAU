import { error } from '@sveltejs/kit';
import { client } from '#lib/sanity/client.js';
import { imageFields } from '#lib/sanity/images.js';
import { linkFields, portableTextFields } from '#lib/sanity/links.js';
import { linkTo } from '#lib/sanity/modules.js';
import { pageSeo, seoFields } from '#lib/sanity/seo.js';

// What a research or course card shows (see Card)
const cardFields = `_id, title, year, image{ ${imageFields} }, ${linkTo}`;

/**
 * A person, by slug, with the research and courses that name them in
 * their People field, newest first.
 */
export async function load({ params }) {
	const person = await client.fetch(
		`*[_type == "person" && slug.current == $slug][0]{
			_id,
			name,
			positions,
			"role": role->title,
			photo{ ${imageFields} },
			bio[]{ ${portableTextFields} },
			"bioText": pt::text(bio),
			contact[]{ ${portableTextFields} },
			links[]{ _key, ${linkFields} },
			"research": *[_type == "research" && references(^._id) && defined(slug.current)]
				| order(year desc){ ${cardFields}, "category": category->title },
			"courses": *[_type == "course" && references(^._id) && defined(slug.current)]
				| order(year desc){ ${cardFields} },
			${seoFields}
		}`,
		{ slug: params.slug }
	);

	if (!person) error(404, 'Not found');

	return {
		person,
		seo: pageSeo(person.seo, {
			title: person.name,
			description: person.bioText?.slice(0, 160),
			image: person.photo
		})
	};
}
