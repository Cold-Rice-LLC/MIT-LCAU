import { imageFields } from '#lib/sanity/images.js';
import { portableTextFields } from '#lib/sanity/links.js';
import { latestCaseStudies, listedCaseStudies } from '#lib/sanity/modules.js';
import { loadPage } from '#lib/sanity/page.js';

/** The Case Studies page and every case study, newest first, listed under "On this page" too. */
export async function load() {
	const data = await loadPage(
		'collaborations/case-studies',
		`"caseStudies": *[${listedCaseStudies}] | ${latestCaseStudies}{
			"id": slug.current,
			partner,
			image{ ${imageFields} },
			text[]{ ${portableTextFields} }
		}`
	);

	const { onThisPage, caseStudies } = data.page;
	if (onThisPage) {
		data.onThisPage.push(...caseStudies.map(({ id, partner }) => ({ id, label: partner })));
	}
	return data;
}
