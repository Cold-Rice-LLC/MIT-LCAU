import { client } from '#lib/sanity/client.js';
import { listedNews, newsCard, newsRow } from '#lib/sanity/modules.js';
import { pageSeo, seoFields } from '#lib/sanity/seo.js';
import { pageRange, paging } from '#lib/url.js';

const PAGE_SIZE = 12;

/**
 * The News landing: the featured posts, on the first page only, and the 12
 * posts on the `?page=`, latest first.
 */
export async function load({ url }) {
	const { page, start, end } = pageRange(url, PAGE_SIZE);
	const { landing, posts, total } = await client.fetch(
		`{
			"landing": *[_id == "page-news"][0]{
				title,
				headline,
				"featured": (featuredNews[]->)[defined(slug.current)]{ ${newsCard} },
				${seoFields}
			},
			"posts": *[${listedNews}]
				| order(date desc, _createdAt desc)[$start...$end]{ ${newsRow} },
			"total": count(*[${listedNews}])
		}`,
		{ start, end }
	);

	const title = landing?.title ?? 'News';
	return {
		title,
		headline: landing?.headline ?? title,
		featured: page === 1 ? (landing?.featured ?? []) : [],
		posts,
		...paging(page, total, PAGE_SIZE),
		seo: pageSeo(landing?.seo, { title })
	};
}
