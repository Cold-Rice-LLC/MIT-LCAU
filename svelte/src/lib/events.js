import { compare } from '#lib/sort.js';

const byTitle = (a, b) => compare(a.title, b.title);

// The All Events sorts: each one's `?sort=`, null for the default, and
// how it orders events that come latest first
export const eventSorts = [
	{ label: 'Date Descending', value: null, order: (events) => events },
	{ label: 'Date Ascending', value: 'date-asc', order: (events) => events.toReversed() },
	{ label: 'Title A–Z', value: 'title', order: (events) => events.toSorted(byTitle) },
	{
		label: 'Title Z–A',
		value: 'title-desc',
		order: (events) => events.toSorted(byTitle).reverse()
	}
];

// Every date and time reads as it is in Cambridge, wherever it's rendered
const timeZone = 'America/New_York';

const partsFormat = new Intl.DateTimeFormat('en-US', {
	timeZone,
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	hour: 'numeric',
	minute: '2-digit',
	hourCycle: 'h12'
});

/** A date's year, month name, day, hour (1–12), minute and dayPeriod (AM or PM) in Cambridge. */
const partsOf = (date) =>
	Object.fromEntries(
		partsFormat.formatToParts(new Date(date)).map(({ type, value }) => [type, value])
	);

// "5", or "5:30" when it isn't on the hour
const clock = ({ hour, minute }) => (minute === '00' ? hour : `${hour}:${minute}`);

/**
 * When an event is, as in Figma: "September 16, 2026, 12:30 PM", a range
 * of times on one day ("September 16, 2026, 5:30 – 7 PM"), or of days
 * without the times ("March 3 – April 21, 2026", or with both years when
 * it crosses one).
 */
export const formatWhen = (start, end) => {
	if (!start) return null;
	const from = partsOf(start);
	const date = `${from.month} ${from.day}, ${from.year}`;
	if (!end) return `${date}, ${clock(from)} ${from.dayPeriod}`;

	const to = partsOf(end);
	if (to.year !== from.year) return `${date} – ${to.month} ${to.day}, ${to.year}`;
	if (to.month !== from.month || to.day !== from.day) {
		return `${from.month} ${from.day} – ${to.month} ${to.day}, ${to.year}`;
	}
	const fromPeriod = from.dayPeriod === to.dayPeriod ? '' : ` ${from.dayPeriod}`;
	return `${date}, ${clock(from)}${fromPeriod} – ${clock(to)} ${to.dayPeriod}`;
};

const dayFormat = new Intl.DateTimeFormat('en-CA', {
	timeZone,
	year: 'numeric',
	month: '2-digit',
	day: '2-digit'
});

/** The day a date falls on in Cambridge, as "2026-09-16". */
export const dayKey = (date) => dayFormat.format(new Date(date));

/**
 * The days an event runs in Cambridge, as `from` and `to` (see dayKey),
 * the same for one day. One that ends at midnight doesn't run the next day.
 */
export const daysOf = ({ start, end }) => ({
	from: dayKey(start),
	to: dayKey(end ? Math.max(new Date(start), new Date(end) - 1) : start)
});

/** The year an event starts in, in Cambridge, as "2026". */
export const yearOf = (event) => dayKey(event.start).slice(0, 4);

/**
 * Whether an event is over by `now`: past its end or, with no end time,
 * past the day it starts on, so it's upcoming all that day.
 */
export const hasEnded = ({ start, end }, now) =>
	end ? new Date(end) <= now : dayKey(start) < dayKey(now);
