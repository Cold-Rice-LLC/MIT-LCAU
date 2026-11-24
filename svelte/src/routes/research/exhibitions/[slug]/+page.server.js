import { loadDetail } from '#lib/sanity/detail.js';
import { latestResearch, listedResearch, researchCard } from '#lib/sanity/modules.js';

/**
 * An exhibition, by slug, with the research picked as related and the
 * eight latest other exhibitions. It sits under the Index in the menu.
 */
export async function load({ params }) {
	const data = await loadDetail(
		'exhibition',
		params.slug,
		`
			startDate,
			endDate,
			datesLabel,
			location,
			"related": (relatedResearch[]->)[${listedResearch}]{ ${researchCard} },
			"more": *[${listedResearch} && _type == "exhibition" && _id != ^._id]
				| ${latestResearch}[0...8]{ ${researchCard} }
		`
	);

	return { ...data, menuParent: '/research/all' };
}
