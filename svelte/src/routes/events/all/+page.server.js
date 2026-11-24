import { client } from '#lib/sanity/client.js';
import { eventCard, listedEvents } from '#lib/sanity/modules.js';
import { pageSeo, seoFields } from '#lib/sanity/seo.js';

/**
 * All Events: the archive's page and every event, latest first.
 * Filtering, sorting, searching and paging happen in +page.js, from the
 * URL, so changing them doesn't load every event again.
 */
export async function load() {
	const { landing, events } = await client.fetch(`{
		"landing": *[_id == "page-events-all"][0]{ title, headline, ${seoFields} },
		"events": *[${listedEvents}] | order(start desc){ ${eventCard}, subtitle }
	}`);

	const title = landing?.title ?? 'All Events';
	return {
		title,
		headline: landing?.headline ?? title,
		events,
		seo: pageSeo(landing?.seo, { title })
	};
}
