import { labelSlug } from '#lib/url.js';

/**
 * A page's modules, each with an `id` for links to it from its heading, or
 * else its "On this page" label: "#who-we-are", then "#who-we-are-2". One
 * with neither has none.
 */
const withIds = (modules) => {
	const counts = {};
	return (modules ?? []).map((module) => {
		const name = module.heading || module.onThisPageLabel;
		if (!name) return module;
		const slug = labelSlug(name) || module._key;
		counts[slug] = (counts[slug] ?? 0) + 1;
		return { ...module, id: counts[slug] > 1 ? `${slug}-${counts[slug]}` : slug };
	});
};

/** The "On this page" links to `modules` (see withIds), less those hidden in the Studio. */
const onThisPageLinks = (modules) =>
	modules
		.filter((module) => module.id && !module.hideOnThisPage)
		.map(({ id, heading, onThisPageLabel }) => ({ id, label: onThisPageLabel || heading }));

/** A page's `modules` with their ids, and its "On this page" links, none unless it shows them. */
export const pageSections = ({ modules: queried, onThisPage }) => {
	const modules = withIds(queried);
	return { modules, onThisPage: onThisPage ? onThisPageLinks(modules) : [] };
};
