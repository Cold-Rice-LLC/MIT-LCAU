import { client } from '#lib/sanity/client.js';
import { eventCard, filterLabels, listedEvents } from '#lib/sanity/modules.js';
import { pageSeo, seoFields } from '#lib/sanity/seo.js';

/**
 * All Events: the archive's page and every event, latest first.
 * Filtering, sorting, searching and paging happen in +page.js, from the
 * URL, so changing them doesn't load every event again. The type filters
 * are the page's Type Filters, in order, or else every type A–Z.
 */
export async function load() {
	const { landing, events } = await client.fetch(`{
		"landing": *[_id == "page-events-all"][0]{
			title,
			headline,
			"types": ${filterLabels('typeFilters', 'eventType')},
			${seoFields}
		},
		"events": *[${listedEvents}] | order(start desc){ ${eventCard}, subtitle, "typeId": type._ref }
	}`);

	const title = landing?.title ?? 'All Events';
	return {
		title,
		headline: landing?.headline ?? title,
		types: landing?.types ?? [],
		events,
		seo: pageSeo(landing?.seo, { title })
	};
}
