import { roleSlug, sortPeople } from '#lib/people.js';
import { fuzzySearch } from '#lib/search.js';
import { paginate } from '#lib/url.js';

/**
 * Who to show, from the URL: `?role=` (a role's slug, see roleSlug) to
 * filter, `?sort=desc` for Z–A (A–Z by default), `?q=` to search names
 * and positions, and `?page=` for which page. Roles with no one are left
 * out of the filters. `total` is how many match, all pages' worth.
 */
export function load({ data, url }) {
	const { people, roles: allRoles, ...rest } = data;
	const params = url.searchParams;

	const roles = allRoles
		.filter((role) => role.label && people.some((person) => person.roleId === role._id))
		.map((role) => ({ ...role, value: roleSlug(role.label) }));
	const role = roles.find((role) => role.value === params.get('role'));
	const descending = params.get('sort') === 'desc';
	const query = params.get('q') ?? '';

	const matches = fuzzySearch(
		sortPeople(role ? people.filter((person) => person.roleId === role._id) : people, descending),
		query,
		(person) => [person.name, ...(person.positions ?? [])].join(' ')
	);

	const { items, ...paging } = paginate(matches, url);

	return {
		...rest,
		roles,
		role: role?.value ?? null,
		sort: descending ? 'desc' : null,
		query,
		...paging,
		people: items
	};
}
