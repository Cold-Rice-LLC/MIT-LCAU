import { error } from '@sveltejs/kit';
import { goto } from '$app/navigation';
import { plain } from '#lib/search.js';

/**
 * A link to `url` with `changes` to its query: each key is set to its
 * value, or removed when the value is empty. The bare path when no query
 * is left.
 */
export const queryHref = (url, changes) => {
	const entries = [...url.searchParams].filter(([key]) => !(key in changes));
	for (const [key, value] of Object.entries(changes)) if (value) entries.push([key, value]);
	const query = new URLSearchParams(entries).toString();
	return query ? `?${query}` : url.pathname;
};

/** queryHref for changing what a list shows, which starts again from its first page. */
export const refineHref = (url, changes) => queryHref(url, { page: null, ...changes });

/**
 * Go to `url` with `changes` to its query (see refineHref) in place,
 * replacing the history entry and keeping the scroll and focus: for
 * typing in a search field.
 */
export const replaceQuery = (url, changes) =>
	goto(refineHref(url, changes), { replace: true, reset: false });

/** A filter's label for the URL: "PhD Students" as `?role=phd-students`. */
export const labelSlug = (label) =>
	plain(label)
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');

/**
 * Filter options from `labels` (see filterLabels): those any of `items`
 * have, by the label's _id in their `key`, each with its `value` for the
 * URL (see labelSlug).
 */
export const filterOptions = (labels, items, key) =>
	labels
		.filter((label) => items.some((item) => item[key] === label._id))
		.map((label) => ({ ...label, value: labelSlug(label.label) }));

/**
 * The `?page=` in `url`, the first by default, as the `start` and `end` of
 * its items, `size` to a page.
 */
export const pageRange = (url, size) => {
	const page = Number(url.searchParams.get('page') ?? 1);
	if (!Number.isInteger(page) || page < 1) error(404, 'Not found');
	return { page, start: (page - 1) * size, end: page * size };
};

/** The page, and how many pages `total` items make. A page that isn't there is a 404. */
export const paging = (page, total, size) => {
	const pageCount = Math.max(1, Math.ceil(total / size));
	if (page > pageCount) error(404, 'Not found');
	return { page, pageCount, total };
};

const PAGE_SIZE = 24;

/** The 24 of `items` on the `?page=` in `url` (see pageRange), with its paging. */
export const paginate = (items, url) => {
	const { page, start, end } = pageRange(url, PAGE_SIZE);
	return { ...paging(page, items.length, PAGE_SIZE), items: items.slice(start, end) };
};
