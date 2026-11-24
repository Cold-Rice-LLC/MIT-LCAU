import { compare } from '#lib/sort.js';

const byTitle = (a, b) => compare(a.title, b.title);

/**
 * How All Events and the Research Index sort: each one's `?sort=`, null for
 * the default, and how it orders items that come latest first.
 */
export const archiveSorts = [
	{ label: 'Date Descending', value: null, order: (items) => items },
	{ label: 'Date Ascending', value: 'date-asc', order: (items) => items.toReversed() },
	{ label: 'Title A–Z', value: 'title', order: (items) => items.toSorted(byTitle) },
	{ label: 'Title Z–A', value: 'title-desc', order: (items) => items.toSorted(byTitle).reverse() }
];

const views = [
	{ label: 'Grid', value: null },
	{ label: 'List', value: 'list' }
];

/** The View and Sort links for RefineBar: `list` or a grid, by the chosen `sort`'s value. */
export const archiveLinks = ({ list, sort }) => [
	{ label: 'View', param: 'view', options: views, value: list ? 'list' : null, keepPage: true },
	{ label: 'Sort', param: 'sort', options: archiveSorts, value: sort }
];
