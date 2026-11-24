import { error } from '@sveltejs/kit';
import { goto } from '$app/navigation';

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
