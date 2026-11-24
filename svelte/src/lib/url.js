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

const PAGE_SIZE = 24;

/**
 * The 24 of `items` on the `?page=` in `url`, the first by default, and
 * how many pages and items there are. A page that isn't there is a 404.
 */
export const paginate = (items, url) => {
	const page = Number(url.searchParams.get('page') ?? 1);
	const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
	if (!Number.isInteger(page) || page < 1 || page > pageCount) error(404, 'Not found');

	return {
		page,
		pageCount,
		total: items.length,
		items: items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
	};
};
