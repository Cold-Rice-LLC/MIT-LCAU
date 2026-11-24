import { imageFields } from '#lib/sanity/images.js';
import { internalFields, linkFields, portableTextFields } from '#lib/sanity/links.js';

const text = `text[]{ ${portableTextFields} }`;
const images = `images[]{ _key, ${imageFields} }`;
const video = `video{ url, caption, poster{ ${imageFields} } }`;
const links = `links[]{ _key, ${linkFields} }`;

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
	"type": type->title,
	start,
	end,
	location,
	image{ ${imageFields} },
	${linkTo}
`;

// Filter for the news posts that have a page to list: a slug and a date
export const listedNews = `_type == "news" && defined(slug.current) && defined(date)`;

// What NewsCard shows
export const newsCard = `
	_id,
	title,
	date,
	image{ ${imageFields} },
	${linkTo}
`;

// What NewsRow shows
export const newsRow = `${newsCard}, "type": type->title, excerpt`;

// Filter for the research, exhibitions and courses that have a page to
// list: a slug, and a year or a date
export const listedResearch = `
	_type in ["research", "exhibition", "course"]
	&& defined(slug.current)
	&& defined(coalesce(startDate, year))
`;

// Latest first: by year, then exhibitions by their opening date
export const latestResearch = `order(coalesce(startDate, string(year)) desc, _createdAt desc)`;

// What ResearchCard shows
export const researchCard = `
	_id,
	_type,
	title,
	excerpt,
	year,
	startDate,
	endDate,
	datesLabel,
	"theme": themes[0]->title,
	image{ ${imageFields} },
	${linkTo}
`;

/**
 * GROQ for a listing page's filters: the labels picked in its `field`, in
 * order, or else every document of `type`, A–Z. `label` is what they say.
 */
export const filterLabels = (field, type, label = 'title') => `select(
	count(${field}) > 0 => (${field}[]->)[defined(title)]{ _id, "label": ${label} },
	*[_type == "${type}" && defined(title)] | order(title asc){ _id, "label": ${label} }
)`;

/**
 * GROQ projection for each module in a modules field, by type. People
 * and opportunities are queried here, so the modules need nothing more.
 */
export const modulesFields = `
	_key,
	_type,
	heading,
	onThisPageLabel,
	hideOnThisPage,
	_type == "textModule" => {
		size,
		"smallHeading": headingStyle == "small" && size != "large",
		${text}
	},
	_type == "textMediaModule" => {
		mediaType,
		layout,
		side,
		${text},
		note,
		${links},
		${images},
		${video}
	},
	_type == "videoModule" => { ${video} },
	_type == "galleryModule" => { display, ${images} },
	_type == "imagesModule" => { ${images} },
	_type == "quoteModule" => { quote, attribution },
	_type == "detailsModule" => { groups[]{ _key, heading, ${text}, ${links} } },
	_type == "cardsModule" => {
		${text},
		count,
		"picked": source == "picked",
		source == "picked" => {
			"cards": (documents[]->)[${listedResearch}]{ ${researchCard} }
		},
		source != "picked" => {
			"cards": *[
				${listedResearch} && _type == coalesce(^.kind, "research") && _id != ^.^._id
			] | ${latestResearch}[0...12]{ ${researchCard} }
		},
		note,
		${links}
	},
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
