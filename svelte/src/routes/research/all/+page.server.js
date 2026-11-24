import { client } from '#lib/sanity/client.js';
import { filterLabels, latestResearch, listedResearch, researchCard } from '#lib/sanity/modules.js';
import { pageSeo, seoFields } from '#lib/sanity/seo.js';

/**
 * The Research Index: its page and every research project, exhibition and
 * course, latest first. Filtering, sorting, searching and paging happen in
 * +page.js, from the URL, so changing them doesn't load everything again.
 * The theme and field filters are the page's, in order, or else every one
 * A–Z.
 */
export async function load() {
	const { landing, items } = await client.fetch(`{
		"landing": *[_id == "page-research-all"][0]{
			title,
			headline,
			"themes": ${filterLabels('themeFilters', 'researchTheme')},
			"fields": ${filterLabels('fieldFilters', 'researchField')},
			${seoFields}
		},
		"items": *[${listedResearch}] | ${latestResearch}{
			${researchCard},
			subtitle,
			"themes": themes[]->title,
			"themeIds": coalesce(themes[]._ref, []),
			"fields": fields[]->title,
			"fieldIds": coalesce(fields[]._ref, [])
		}
	}`);

	const title = landing?.title ?? 'Index';
	return {
		headline: landing?.headline ?? title,
		allThemes: landing?.themes ?? [],
		allFields: landing?.fields ?? [],
		items,
		seo: pageSeo(landing?.seo, { title })
	};
}
