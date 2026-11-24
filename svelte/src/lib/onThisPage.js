import { labelSlug } from '#lib/url.js';

/**
 * A page's modules, each with an `id` for links to it from its heading, or
 * else its "On this page" label: "#who-we-are", then "#who-we-are-2". One
 * with neither has none.
 */
export const withIds = (modules) => {
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
export const onThisPageLinks = (modules) =>
	modules
		.filter((module) => module.id && !module.hideOnThisPage)
		.map(({ id, heading, onThisPageLabel }) => ({ id, label: onThisPageLabel || heading }));
