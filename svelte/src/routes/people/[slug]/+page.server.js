import { error } from '@sveltejs/kit';
import { client } from '#lib/sanity/client.js';
import { imageFields } from '#lib/sanity/images.js';
import { linkFields, portableTextFields } from '#lib/sanity/links.js';
import { latestResearch, listedResearch, researchCard } from '#lib/sanity/modules.js';
import { pageSeo, seoFields } from '#lib/sanity/seo.js';

/**
 * A person, by slug, with the research and courses that name them in
 * their People field, newest first.
 */
export async function load({ params }) {
	const person = await client.fetch(
		`*[_type == "person" && slug.current == $slug][0]{
			name,
			positions,
			"role": role->title,
			photo{ ${imageFields} },
			bio[]{ ${portableTextFields} },
			"bioText": pt::text(bio),
			contact[]{ ${portableTextFields} },
			links[]{ _key, ${linkFields} },
			"research": *[${listedResearch} && _type == "research" && references(^._id)]
				| ${latestResearch}{ ${researchCard} },
			"courses": *[${listedResearch} && _type == "course" && references(^._id)]
				| ${latestResearch}{ ${researchCard} },
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
