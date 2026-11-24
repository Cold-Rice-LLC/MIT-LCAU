import { error } from '@sveltejs/kit';
import { client } from '#lib/sanity/client.js';
import { listedNews, modulesFields, newsCard } from '#lib/sanity/modules.js';
import { pageSeo, seoFields } from '#lib/sanity/seo.js';

/**
 * A news post, by slug, with three more: those picked in the Studio, then
 * the latest of the same type, then the latest of all.
 */
export async function load({ params }) {
	const post = await client.fetch(
		`*[_type == "news" && slug.current == $slug][0]{
			_id,
			title,
			date,
			excerpt,
			image{ asset },
			modules[]{ ${modulesFields} },
			"picked": (relatedNews[]->)[defined(slug.current) && _id != ^._id]{ ${newsCard} },
			"latest": *[
				${listedNews} && _id != ^._id && !(_id in coalesce(^.relatedNews[]._ref, []))
			] | order(select(type == ^.type => 0, 1) asc, date desc, _createdAt desc)[0...3]{
				${newsCard}
			},
			${seoFields}
		}`,
		{ slug: params.slug }
	);

	if (!post) error(404, 'Not found');

	return {
		post,
		more: [...(post.picked ?? []), ...post.latest].slice(0, 3),
		seo: pageSeo(post.seo, { title: post.title, description: post.excerpt, image: post.image })
	};
}
