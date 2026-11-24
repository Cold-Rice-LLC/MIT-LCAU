import { sortPeople } from '#lib/people.js';
import { fuzzySearch } from '#lib/search.js';
import { filterOptions, paginate } from '#lib/url.js';

/**
 * Who to show, from the URL: `?role=` (a role's labelSlug) to
 * filter, `?sort=desc` for Z–A (A–Z by default), `?q=` to search names
 * and positions, and `?page=` for which page. Roles with no one are left
 * out of the filters. `total` is how many match, all pages' worth.
 */
export function load({ data, url }) {
	const { people, roles: allRoles, ...rest } = data;
	const params = url.searchParams;

	const roles = filterOptions(allRoles, people, 'roleIds');
	const role = roles.find((role) => role.value === params.get('role'));
	const descending = params.get('sort') === 'desc';
	const query = params.get('q') ?? '';

	const matches = fuzzySearch(
		sortPeople(
			role ? people.filter(({ roleIds }) => roleIds?.includes(role._id)) : people,
			descending
		),
		query,
		(person) => [person.name, ...(person.positions ?? [])].join(' ')
	);

	const { items, ...paging } = paginate(matches, url);

	return {
		...rest,
		roles,
		role,
		sort: descending ? 'desc' : null,
		query,
		...paging,
		people: items
	};
}
