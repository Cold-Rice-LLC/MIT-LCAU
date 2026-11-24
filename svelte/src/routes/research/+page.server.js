import { client } from '#lib/sanity/client.js';
import { buttonsFields, portableTextFields } from '#lib/sanity/links.js';
import { latestResearch, listedResearch, researchCard } from '#lib/sanity/modules.js';
import { pageSeo, seoFields } from '#lib/sanity/seo.js';

/** The Research landing, with the latest research, exhibitions and courses. */
export async function load() {
	const latest = (type, count) =>
		`*[${listedResearch} && _type == "${type}"] | ${latestResearch}[0...${count}]{ ${researchCard} }`;

	const { landing, ...recent } = await client.fetch(`{
		"landing": *[_id == "page-research"][0]{
			title,
			headline,
			intro[]{ ${portableTextFields} },
			${buttonsFields},
			${seoFields}
		},
		"research": ${latest('research', 6)},
		"exhibitions": ${latest('exhibition', 6)},
		"courses": ${latest('course', 3)}
	}`);

	const title = landing?.title ?? 'Research';
	return {
		headline: landing?.headline ?? title,
		intro: landing?.intro,
		note: landing?.note,
		links: landing?.links,
		...recent,
		seo: pageSeo(landing?.seo, { title })
	};
}
