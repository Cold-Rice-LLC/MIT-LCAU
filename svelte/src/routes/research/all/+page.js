import { archiveSorts } from '#lib/archive.js';
import { researchTypes, yearsOf } from '#lib/research.js';
import { fuzzySearch } from '#lib/search.js';
import { compare } from '#lib/sort.js';
import { filterOptions, paginate } from '#lib/url.js';

/**
 * What the Index shows, from the URL: `?type=` (see researchTypes),
 * `?year=`, `?theme=` and `?field=` (a label's labelSlug) to filter, all
 * at once, `?sort=` (see archiveSorts), `?q=` to search titles,
 * subtitles, excerpts, types, themes, fields and years, `?view=list` for
 * rows rather than cards, and `?page=` for which page. Types and labels
 * with nothing are left out of the filters. `total` is how many match, all
 * pages' worth.
 */
export function load({ data, url }) {
	const { items, allThemes, allFields, ...rest } = data;
	const params = url.searchParams;

	const types = Object.entries(researchTypes)
		.filter(([_type]) => items.some((item) => item._type === _type))
		.map(([_type, { label, value }]) => ({ _type, label, value }));
	const years = [...new Set(items.flatMap(yearsOf))]
		.sort((a, b) => compare(b, a))
		.map((year) => ({ label: year, value: year }));
	const themes = filterOptions(allThemes, items, 'themeIds');
	const fields = filterOptions(allFields, items, 'fieldIds');

	const chosen = (options, param) => options.find(({ value }) => value === params.get(param));
	const type = chosen(types, 'type');
	const year = chosen(years, 'year');
	const theme = chosen(themes, 'theme');
	const field = chosen(fields, 'field');
	const sort = chosen(archiveSorts, 'sort') ?? archiveSorts[0];
	const query = params.get('q') ?? '';

	const filtered = items.filter(
		(item) =>
			(!type || item._type === type._type) &&
			(!year || yearsOf(item).includes(year.value)) &&
			(!theme || item.themeIds.includes(theme._id)) &&
			(!field || item.fieldIds.includes(field._id))
	);
	const matches = fuzzySearch(sort.order(filtered), query, (item) =>
		[
			item.title,
			item.subtitle,
			item.excerpt,
			researchTypes[item._type].label,
			...(item.themes ?? []),
			...(item.fields ?? []),
			...yearsOf(item)
		].join(' ')
	);

	const { items: shown, ...paging } = paginate(matches, url);

	return {
		...rest,
		filter: { options: types, value: type?.value ?? null },
		dropdowns: [
			{ label: 'Year', param: 'year', options: years, value: year?.value ?? null },
			{ label: 'Theme', param: 'theme', options: themes, value: theme?.value ?? null },
			{ label: 'Field', param: 'field', options: fields, value: field?.value ?? null }
		],
		sort: sort.value,
		list: params.get('view') === 'list',
		query,
		...paging,
		items: shown
	};
}
