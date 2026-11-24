import { eventSorts, yearOf } from '#lib/events.js';
import { fuzzySearch } from '#lib/search.js';
import { filterOptions, paginate } from '#lib/url.js';

/**
 * Which events to show, from the URL: `?type=` (a type's labelSlug) to
 * filter, `?sort=` (see eventSorts), `?q=` to search titles, subtitles,
 * types and locations, `?view=list` for rows rather than cards, and
 * `?page=` for which page. Sorted by date, a page's events group under
 * their years; a search's under "Results for …". Types with no events are
 * left out of the filters. `total` is how many match, all pages' worth.
 */
export function load({ data, url }) {
	const { events, types: allTypes, ...rest } = data;
	const params = url.searchParams;

	const types = filterOptions(allTypes, events, 'typeId');
	const type = types.find((type) => type.value === params.get('type'));
	const sort = eventSorts.find((sort) => sort.value === params.get('sort')) ?? eventSorts[0];
	const query = params.get('q') ?? '';

	const matches = fuzzySearch(
		sort.order(type ? events.filter((event) => event.typeId === type._id) : events),
		query,
		(event) => [event.title, event.subtitle, event.type, event.location].join(' ')
	);

	const { items, ...paging } = paginate(matches, url);

	// What each event goes under; sorted by title, nothing
	const headingOf = (event) => {
		if (query) return `Results for “${query}”`;
		return sort.value?.startsWith('title') ? null : yearOf(event);
	};

	return {
		...rest,
		types,
		type: type?.value ?? null,
		sort: sort.value,
		list: params.get('view') === 'list',
		query,
		...paging,
		groups: [...Map.groupBy(items, headingOf)].map(([heading, events]) => ({ heading, events }))
	};
}
