import { sortFeed } from '#lib/feed.js';
import { fetchCards } from '#lib/sanity/cards.js';
import { client } from '#lib/sanity/client.js';
import { imageFields } from '#lib/sanity/images.js';
import { listedFeed } from '#lib/sanity/modules.js';
import { pageSeo, seoFields } from '#lib/sanity/seo.js';

const FEED_SIZE = 24;

/**
 * The homepage, and its feed: those featured in the Studio, all of them,
 * then the latest of everything else (see sortFeed), up to 24.
 */
export async function load() {
	const { homepage, items } = await client.fetch(`{
		"homepage": *[_id == "homepage"][0]{
			heroSlides[]{ ${imageFields} },
			"featured": (featured[]->)[${listedFeed}]._id,
			${seoFields}
		},
		"items": *[${listedFeed}]{ _id, _type, _createdAt, start, end, date, startDate, year }
	}`);

	const latest = sortFeed(items, new Date()).map(({ _id }) => _id);
	const featured = homepage?.featured ?? [];
	const ids = [...new Set([...featured, ...latest])];

	// No title of its own in the head tags: the homepage is the site's title alone
	return {
		homepage,
		feed: await fetchCards(ids.slice(0, Math.max(FEED_SIZE, featured.length))),
		seo: pageSeo(homepage?.seo)
	};
}
