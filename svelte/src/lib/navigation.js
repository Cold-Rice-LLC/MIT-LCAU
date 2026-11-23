import { linkHref } from '#lib/sanity/links.js';

/** Where a menu section's title goes: its landing page, or else its first link. */
export const sectionHref = (section) =>
	section.landing
		? linkHref({ linkType: 'internal', internal: section.landing })
		: linkHref(section.links?.[0]);

/**
 * The menu section the current page is in, and the link under it that
 * points here, for highlighting and breadcrumbs. `link` is null on a
 * section's landing page; both are null outside the menu (the homepage).
 * A page under a link's URL, like a person's under People's, is `nested`
 * in that link.
 */
export const activeTrail = (navigation, pathname) => {
	for (const section of navigation) {
		const link = section.links?.find((link) => linkHref(link) === pathname);
		if (link) return { section, link, nested: false };
		if (section.landing && sectionHref(section) === pathname) {
			return { section, link: null, nested: false };
		}
	}
	for (const section of navigation) {
		const link = section.links?.find((link) => {
			const href = linkHref(link);
			return href?.startsWith('/') && pathname.startsWith(`${href}/`);
		});
		if (link) return { section, link, nested: true };
	}
	return { section: null, link: null, nested: false };
};
