import { client } from '#lib/sanity/client.js';
import { dayKey, daysOf, hasEnded } from '#lib/events.js';
import { eventCard, linkTo, listedEvents } from '#lib/sanity/modules.js';
import { pageSeo, seoFields } from '#lib/sanity/seo.js';

/**
 * The Events landing: what's coming up, soonest first, the eight latest
 * past events, and every event's days for the calendar. The query takes
 * a day's leeway either side of now; hasEnded draws the line, so an
 * event with no end time is upcoming all the day it's on.
 */
export async function load() {
	const now = new Date();
	const { landing, archive, upcoming, past, dates } = await client.fetch(
		`{
			"landing": *[_id == "page-events"][0]{ title, headline, ${seoFields} },
			"archive": *[_id == "page-events-all"][0]{ ${linkTo} }.link,
			"upcoming": *[${listedEvents} && dateTime(coalesce(end, start)) > dateTime($now) - 86400]
				| order(start asc){ ${eventCard} },
			"past": *[${listedEvents} && dateTime(start) < dateTime($now)]
				| order(start desc)[0...16]{ ${eventCard} },
			"dates": *[${listedEvents}]{ start, end }
		}`,
		{ now: now.toISOString() }
	);

	const title = landing?.title ?? 'Events';
	return {
		title,
		headline: landing?.headline ?? 'Upcoming Events',
		archive,
		upcoming: upcoming.filter((event) => !hasEnded(event, now)),
		past: past.filter((event) => hasEnded(event, now)).slice(0, 8),
		days: dates.map(daysOf),
		today: dayKey(now),
		seo: pageSeo(landing?.seo, { title })
	};
}
