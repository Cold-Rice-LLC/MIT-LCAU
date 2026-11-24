import { loadDetail } from '#lib/sanity/detail.js';
import { latestResearch, listedResearch, researchCard } from '#lib/sanity/modules.js';

/**
 * A research project, by slug, with four related: those picked in the
 * Studio, or else the latest, starting with any that share a theme. It
 * sits under the Index in the menu.
 */
export async function load({ params }) {
	const related = `*[${listedResearch} && _type == "research" && _id != ^._id]`;
	const data = await loadDetail(
		'research',
		params.slug,
		`
			year,
			"picked": (relatedResearch[]->)[${listedResearch}]{ ${researchCard} },
			"sameTheme": ${related}[count((themes[]._ref)[@ in ^.^.themes[]._ref]) > 0]
				| ${latestResearch}[0...4]{ ${researchCard} },
			"latest": ${related} | ${latestResearch}[0...8]{ ${researchCard} }
		`
	);

	const { picked, sameTheme, latest } = data.page;
	const automatic = [
		...new Map([...sameTheme, ...latest].map((item) => [item._id, item])).values()
	].slice(0, 4);

	return {
		...data,
		related: picked?.length ? picked : automatic,
		menuParent: '/research/all'
	};
}
