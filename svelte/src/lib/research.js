import { datePartsFormat } from '#lib/dates.js';

/** How each type in the Research Index reads: its tag, its filter, and its cards' colour. */
export const researchTypes = {
	research: { tag: 'Research', label: 'Research', value: 'research', class: 'bg-cool-gray' },
	exhibition: {
		tag: 'Exhibition',
		label: 'Exhibitions',
		value: 'exhibitions',
		class: 'bg-orange'
	},
	course: { tag: 'Course', label: 'Courses', value: 'courses', class: 'bg-pink' }
};

const yearOf = (date) => Number(date.slice(0, 4));

/** The first and last year something runs, as numbers: the same for all but some exhibitions. */
const yearSpan = ({ year, startDate, endDate }) => {
	const first = year ?? yearOf(startDate);
	return [first, endDate ? yearOf(endDate) : first];
};

/** The years something runs, as strings, for the Index's Year filter. */
export const yearsOf = (item) => {
	const [first, last] = yearSpan(item);
	return Array.from({ length: last - first + 1 }, (_, i) => String(first + i));
};

/** Its year or years in a list: "2025", or "2025–2026". */
export const formatYears = (item) => [...new Set(yearSpan(item))].join('–');

// A date field's, read as UTC so it doesn't slip back a day
const partsOf = datePartsFormat({
	timeZone: 'UTC',
	year: 'numeric',
	month: 'long',
	day: 'numeric'
});

/**
 * An exhibition's dates, as in Figma: "May 10 – November 23, 2025", both
 * years when it crosses one, "September 21–25, 2022" within a month, or
 * the Studio's text in their place.
 */
export const formatDates = ({ startDate, endDate, datesLabel }) => {
	if (datesLabel) return datesLabel;
	if (!startDate) return null;
	const from = partsOf(startDate);
	const start = `${from.month} ${from.day}`;
	if (!endDate || endDate === startDate) return `${start}, ${from.year}`;

	const to = partsOf(endDate);
	const end = `${to.month} ${to.day}, ${to.year}`;
	if (from.year !== to.year) return `${start}, ${from.year} – ${end}`;
	if (from.month !== to.month) return `${start} – ${end}`;
	return `${start}–${to.day}, ${to.year}`;
};

/** The small line on a card: "2025, Cities Initiative", its dates, or "2025 Course Year". */
export const researchMeta = (item) => {
	if (item._type === 'exhibition') return formatDates(item);
	if (item._type === 'course') return `${item.year} Course Year`;
	return [item.year, item.theme].filter(Boolean).join(', ');
};
