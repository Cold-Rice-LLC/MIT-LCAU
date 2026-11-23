import { plain } from '#lib/search.js';

const collator = new Intl.Collator('en', { sensitivity: 'base', numeric: true });

/**
 * What a person sorts by: their Sort Name, or else their name last word
 * first, so “Sarah Williams” sorts as “Williams, Sarah”.
 */
const sortKey = ({ sortName, name = '' }) => {
	if (sortName) return sortName;
	const words = name.trim().split(/\s+/);
	return [words.pop(), words.join(' ')].filter(Boolean).join(', ');
};

/** `people` A–Z by sortKey, or Z–A given `descending`. A new array. */
export const sortPeople = (people, descending = false) => {
	const sorted = people.toSorted((a, b) => collator.compare(sortKey(a), sortKey(b)));
	return descending ? sorted.reverse() : sorted;
};

/** A role's name for the URL, as `?role=phd-students`. */
export const roleSlug = (label) =>
	plain(label)
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
