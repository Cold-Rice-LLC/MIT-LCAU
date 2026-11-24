import { client } from '#lib/sanity/client.js';
import { filterLabels, personCard } from '#lib/sanity/modules.js';
import { pageSeo, seoFields } from '#lib/sanity/seo.js';

/**
 * The People landing and everyone. Filtering, sorting, searching and
 * paging happen in +page.js, from the URL, so changing them doesn't load
 * everyone again. The role filters are the landing's Role Filters, in
 * order, or else every role A–Z.
 */
export async function load() {
	const { landing, people } = await client.fetch(`{
		"landing": *[_id == "page-people"][0]{
			title,
			headline,
			"roles": ${filterLabels('roleFilters', 'role', 'coalesce(pluralTitle, title)')},
			${seoFields}
		},
		"people": *[_type == "person" && defined(slug.current)]{
			${personCard},
			"roleIds": roles[]._ref
		}
	}`);

	const title = landing?.title ?? 'People';
	return {
		title,
		headline: landing?.headline ?? title,
		roles: landing?.roles ?? [],
		people,
		seo: pageSeo(landing?.seo, { title })
	};
}
