import { client } from '#lib/sanity/client.js';
import { imageFields } from '#lib/sanity/images.js';
import { eventCard, linkTo, newsRow, personCard, researchRow } from '#lib/sanity/modules.js';

// A document with its own page that shows as a PageRow. Pages have no
// excerpt or image of their own, so theirs come from what's on them.
const pageRow = `
	"menuTitle": title,
	"title": coalesce(headline, title),
	"excerpt": [
		excerpt,
		seo.description,
		pt::text(intro),
		pt::text(text),
		pt::text(modules[defined(text)][0].text)
	][defined(@) && @ != ""][0],
	"image": [
		image,
		seo.image,
		modules[defined(images)][0].images[0]
	][defined(asset)][0]{ ${imageFields} },
	${linkTo}
`;

/** The documents with these `ids`, in their order, with what their cards and list rows show. */
export const fetchCards = async (ids) => {
	const docs = await client.fetch(
		`*[_id in $ids]{
			_id,
			_type,
			_type == "event" => { ${eventCard}, excerpt },
			_type == "news" => { ${newsRow} },
			_type in ["research", "exhibition", "course"] => { ${researchRow} },
			_type == "person" => { ${personCard} },
			_type in ["page", "educationPage", "opportunity", "caseStudy"] => { ${pageRow} }
		}`,
		{ ids }
	);

	const byId = new Map(docs.map((doc) => [doc._id, doc]));
	return ids.flatMap((id) => byId.get(id) ?? []);
};
