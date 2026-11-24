import { linkHref } from '#lib/sanity/links.js';

/** Where a menu section's title goes: its landing page, or else its first link. */
export const sectionHref = (section) =>
	section.landing
		? linkHref({ linkType: 'internal', internal: section.landing })
		: linkHref(section.links?.[0]);

// The first section with a link to `href`, and that link, or whose landing
// page is there, with a null link
const findTrail = (navigation, href) => {
	for (const section of navigation) {
		const link = section.links?.find((link) => linkHref(link) === href);
		if (link) return { section, link };
		if (section.landing && sectionHref(section) === href) return { section, link: null };
	}
};

/**
 * The menu section the current page is in, and the link under it that
 * points here, for highlighting and breadcrumbs. `link` is null on a
 * section's landing page; both are null outside the menu (the homepage).
 * A page under a link's URL, like a person's under People's, is `nested`
 * in that link: "About → People → Name". A page under the section's
 * landing page instead, like an opportunity's under About's, is nested in
 * the section alone, with a null `link`: "About → Title". That holds even
 * when a link also points at the landing page, as Mission does.
 * A page can name the one it's nested in, by its href, as `parent`: an
 * event is under Upcoming Events or Past Events depending on its date.
 */
export const activeTrail = (navigation, pathname, parent) => {
	const above = parent && findTrail(navigation, parent);
	if (above) return { ...above, nested: true };
	const here = findTrail(navigation, pathname);
	if (here) return { ...here, nested: false };

	const isUnder = (href) => href?.startsWith('/') && pathname.startsWith(`${href}/`);
	for (const section of navigation) {
		const landing = section.landing && sectionHref(section);
		const link = section.links?.find((link) => {
			const href = linkHref(link);
			return href !== landing && isUnder(href);
		});
		if (link) return { section, link, nested: true };
	}
	for (const section of navigation) {
		if (section.landing && isUnder(sectionHref(section))) {
			return { section, link: null, nested: true };
		}
	}
	return { section: null, link: null, nested: false };
};

/**
 * The crumbs after the section's title for a trail (see activeTrail): the
 * link a nested page sits under, if any, and the current one, in purple.
 * `here` is the page's title when nested, else the link's label, and null
 * on a section's landing page.
 */
export const breadcrumb = (trail, title) => ({
	via: trail.nested ? trail.link?.label : null,
	here: trail.nested ? title : trail.link?.label
});

/**
 * The breadcrumb to a search result: the crumbs `above` it and the one
 * `here`, as the menu would show them on its page, or the section alone
 * for a landing page. Out of the menu, news is under News and anything
 * else is its title alone.
 */
export const crumbsTo = (navigation, { _type, menuTitle, name, title, link, menuParent }) => {
	const own = menuTitle ?? name ?? title;
	const href = linkHref(link);
	const landing = navigation.find((section) => section.landing && sectionHref(section) === href);
	if (landing) return { above: [], here: landing.title };

	const trail = activeTrail(navigation, href, menuParent);
	const { via, here } = breadcrumb(trail, own);
	const section = trail.section?.title ?? (_type === 'news' ? 'News' : null);
	return {
		above: [section, via].filter(Boolean),
		here: here ?? own
	};
};
