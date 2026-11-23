import { error } from '@sveltejs/kit';
import { roleSlug, sortPeople } from '#lib/people.js';
import { fuzzySearch } from '#lib/search.js';
import { pageParam } from '#lib/url.js';

const PAGE_SIZE = 24;

/**
 * Who to show, from the URL: `?role=` (a role's slug, see roleSlug) to
 * filter, `?sort=desc` for Z–A (A–Z by default), `?q=` to search names
 * and positions, and `?page=` for which 24. Roles with no one are left
 * out of the filters. `total` is how many match, all pages' worth.
 */
export function load({ data, url }) {
	const { people, roles: allRoles, ...rest } = data;
	const params = url.searchParams;

	const roles = allRoles
		.filter((role) => role.label && people.some((person) => person.roleId === role._id))
		.map((role) => ({ ...role, slug: roleSlug(role.label) }));
	const role = roles.find((role) => role.slug === params.get('role'));
	const descending = params.get('sort') === 'desc';
	const query = params.get('q') ?? '';
	const page = pageParam(url);

	const matches = fuzzySearch(
		sortPeople(role ? people.filter((person) => person.roleId === role._id) : people, descending),
		query,
		(person) => [person.name, ...(person.positions ?? [])].join(' ')
	);

	const pageCount = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
	if (page > pageCount) error(404, 'Not found');

	return {
		...rest,
		roles,
		role: role?.slug ?? null,
		descending,
		query,
		page,
		pageCount,
		total: matches.length,
		people: matches.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
	};
}
