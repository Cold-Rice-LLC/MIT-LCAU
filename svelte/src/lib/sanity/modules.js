import { imageFields } from '#lib/sanity/images.js';
import { internalFields, linkFields, portableTextFields } from '#lib/sanity/links.js';

const text = `text[]{ ${portableTextFields} }`;
const images = `images[]{ _key, ${imageFields} }`;

// A document as an internal link, for AppLink
export const linkTo = `"link": { "linkType": "internal", "internal": { ${internalFields} } }`;

// What PersonCard shows, and their Sort Name to sort them by (see sortPeople)
export const personCard = `
	_id,
	name,
	sortName,
	positions,
	"role": role->title,
	photo{ ${imageFields} },
	${linkTo}
`;

// Filter for the events that have a page to list: a slug and a date
export const listedEvents = `_type == "event" && defined(slug.current) && defined(start)`;

// What an event's cards and list rows show
export const eventCard = `
	_id,
	title,
	type,
	start,
	end,
	location,
	image{ ${imageFields} },
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
	_type == "textMediaModule" => {
		layout,
		${text},
		note,
		links[]{ _key, ${linkFields} },
		${images}
	},
	_type == "videoModule" => { video{ url, caption, poster{ ${imageFields} } } },
	_type == "galleryModule" => { display, ${images} },
	_type == "peopleModule" => {
		display,
		display == "tabs" => {
			"tabs": roles[]->{
				_id,
				"label": coalesce(pluralTitle, title),
				"people": *[_type == "person" && references(^._id)]{ ${personCard} }
			},
			"peoplePage": *[_id == "page-people"][0]{ ${linkTo} }.link
		},
		display != "tabs" => {
			${text},
			"byRole": defined(role),
			"people": select(
				defined(role) => *[_type == "person" && references(^.role._ref)],
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
