import { imageFields } from '#lib/sanity/images.js';
import { internalFields, portableTextFields } from '#lib/sanity/links.js';

const text = `text[]{ ${portableTextFields} }`;
const images = `images[]{ _key, ${imageFields} }`;

// A document as an internal link, for AppLink
const linkTo = `"link": { "linkType": "internal", "internal": { ${internalFields} } }`;

// What PersonCard shows: their first role is the tag
const personCard = `
	_id,
	name,
	positions,
	"role": roles[0]->title,
	photo{ ${imageFields} },
	${linkTo}
`;

/**
 * GROQ projection for each module in a modules field, by type. People
 * and opportunities are queried here, so the modules need nothing more.
 */
export const modulesFields = `
	_key,
	_type,
	heading,
	_type == "textModule" => { size, ${text} },
	_type == "textMediaModule" => { layout, ${text}, ${images} },
	_type == "galleryModule" => { display, ${images} },
	_type == "peopleModule" => {
		display,
		display == "tabs" => {
			"tabs": roles[]->{
				_id,
				"label": coalesce(pluralTitle, title),
				"people": *[_type == "person" && references(^._id)] | order(name asc)[0...4]{ ${personCard} }
			},
			"peoplePage": *[_id == "page-people"][0]{ ${linkTo} }.link
		},
		display != "tabs" => {
			${text},
			"people": select(
				defined(role) => *[_type == "person" && references(^.role._ref)] | order(name asc),
				people[]->
			){ ${personCard} }
		}
	},
	_type == "opportunitiesModule" => {
		subheading,
		${text},
		"opportunities": *[_type == "opportunity" && open != false && defined(slug.current)]
			| order(postedOn desc){ _id, title, excerpt, ${linkTo} }
	},
	_type == "columnsModule" => { columns[]{ _key, heading, ${text} } }
`;
