import { searchTitle } from '#lib/search.js';
import { searchSite } from '#lib/server/siteSearch.js';

export async function load({ url }) {
	const search = await searchSite(url);
	return { search, seo: { title: searchTitle(search.query), noindex: true } };
}
