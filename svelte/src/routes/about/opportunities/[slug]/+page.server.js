import { error } from '@sveltejs/kit';
import { client } from '#lib/sanity/client.js';
import { portableTextFields } from '#lib/sanity/links.js';
import { pageSeo, seoFields } from '#lib/sanity/seo.js';

/**
 * An opportunity, by slug, open or closed: a closed one leaves the About
 * page's list but keeps its page.
 */
export async function load({ params }) {
	const opportunity = await client.fetch(
		`*[_type == "opportunity" && slug.current == $slug][0]{
			title,
			excerpt,
			term,
			salaryRange,
			postedOn,
			deadline,
			applyUrl,
			body[]{ ${portableTextFields} },
			details[]{ ${portableTextFields} },
			howToApply[]{ ${portableTextFields} },
			${seoFields}
		}`,
		{ slug: params.slug }
	);

	if (!opportunity) error(404, 'Not found');

	return {
		opportunity,
		seo: pageSeo(opportunity.seo, {
			title: opportunity.title,
			description: opportunity.excerpt
		})
	};
}
