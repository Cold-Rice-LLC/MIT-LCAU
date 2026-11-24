import { dayKey, hasEnded } from '#lib/events.js';

/** The day something in the feed is dated, as "2026-09-16". */
const dayOf = ({ _type, start, date, startDate, year, _createdAt }, today) => {
	if (_type === 'event') return dayKey(start);
	if (date ?? startDate) return date ?? startDate;
	// Research and courses only have a year: the day they were added, if it
	// was that year, or else the last of it, never past today
	const added = dayKey(_createdAt);
	if (added.startsWith(String(year))) return added;
	const lastDay = `${year}-12-31`;
	return lastDay < today ? lastDay : today;
};

/**
 * `items`, documents of the Studio's feedTypes, in the order the homepage
 * shows them: events that aren't over and exhibitions yet to open, soonest
 * first, then the rest, latest first.
 */
export const sortFeed = (items, now) => {
	const today = dayKey(now);
	const dated = items.map((item) => {
		const day = dayOf(item, today);
		const upcoming = item._type === 'event' ? !hasEnded(item, now) : day > today;
		return { item, upcoming, time: item.start ?? day };
	});
	dated.sort((a, b) => {
		if (a.upcoming !== b.upcoming) return a.upcoming ? -1 : 1;
		if (a.time === b.time) return 0;
		return a.time < b.time === a.upcoming ? -1 : 1;
	});
	return dated.map(({ item }) => item);
};
