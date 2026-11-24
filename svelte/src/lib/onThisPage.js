import { dayKey } from '#lib/events.js';
import { labelSlug } from '#lib/url.js';

/**
 * A page's modules, each with an `id` for links to it from its heading, or
 * else its "On this page" label: "#who-we-are", then "#who-we-are-2". One
 * with neither has none.
 */
const withIds = (modules) => {
	const counts = {};
	return modules.map((module) => {
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

/** `modules` without the open calls that have closed, or any module left with none. */
const withOpenCalls = (modules) => {
	const today = dayKey(new Date());
	return (modules ?? [])
		.map((module) =>
			module._type === 'openCallsModule'
				? {
						...module,
						calls: (module.calls ?? []).filter(({ closesOn }) => !closesOn || closesOn >= today)
					}
				: module
		)
		.filter(({ calls }) => !calls || calls.length);
};

/**
 * The `page` with its modules' ids, and its "On this page" links, none
 * unless it shows them. They start with its intro if it has an
 * `introLabel`, with an id for that as `introId`.
 */
export const pageSections = (page) => {
	const { onThisPage, intro, introLabel } = page;
	const modules = withOpenCalls(page.modules);
	const listsIntro = onThisPage && introLabel && intro?.length;
	const sections = withIds(listsIntro ? [{ heading: introLabel }, ...modules] : modules);
	return {
		page: {
			...page,
			introId: listsIntro ? sections[0].id : undefined,
			modules: listsIntro ? sections.slice(1) : sections
		},
		onThisPage: onThisPage ? onThisPageLinks(sections) : []
	};
};
