import { error } from '@sveltejs/kit';
import { client } from '#lib/sanity/client.js';
import { hasEnded } from '#lib/events.js';
import { eventCard, listedEvents, modulesFields } from '#lib/sanity/modules.js';
import { pageSeo, seoFields } from '#lib/sanity/seo.js';

/**
 * An event, by slug, with its related events: those picked in the
 * Studio, or else the next four coming up. `ended` decides between its
 * RSVP and "This event has ended.", and whether the menu shows it under
 * Upcoming or Past.
 */
export async function load({ params }) {
	const now = new Date();
	const event = await client.fetch(
		`*[_type == "event" && slug.current == $slug][0]{
			title,
			subtitle,
			type,
			start,
			end,
			location,
			attendance,
			rsvpUrl,
			image{ asset },
			modules[]{ ${modulesFields} },
			"related": select(
				count(relatedEvents) > 0 => (relatedEvents[]->)[defined(slug.current)]{ ${eventCard} },
				*[${listedEvents} && _id != ^._id && dateTime(start) > dateTime($now)]
					| order(start asc)[0...4]{ ${eventCard} }
			),
			${seoFields}
		}`,
		{ slug: params.slug, now: now.toISOString() }
	);

	if (!event?.start) error(404, 'Not found');

	const ended = hasEnded(event, now);
	return {
		event,
		ended,
		// Which of the menu's Events links this page sits under
		menuParent: ended ? '/events/all' : '/events',
		seo: pageSeo(event.seo, { title: event.title, description: event.subtitle, image: event.image })
	};
}
