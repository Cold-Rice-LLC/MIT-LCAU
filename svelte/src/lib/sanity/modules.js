import { imageFields } from '#lib/sanity/images.js';
import {
	buttonsFields,
	internalFields,
	linkFields,
	portableTextFields
} from '#lib/sanity/links.js';

const text = `text[]{ ${portableTextFields} }`;
const images = `images[]{ _key, ${imageFields} }`;
const video = `video{ url, caption, poster{ ${imageFields} } }`;

// A document as an internal link, for AppLink
export const linkTo = `"link": { "linkType": "internal", "internal": { ${internalFields} } }`;

// What PersonCard shows, and their Sort Name to sort them by (see sortPeople)
export const personCard = `
	_id,
	name,
	sortName,
	positions,
	"roles": roles[]->{ _id, title },
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

// What a news post's ImageCard shows
export const newsCard = `
	_id,
	title,
	date,
	image{ ${imageFields} },
	${linkTo}
`;

// What NewsRow shows
export const newsRow = `${newsCard}, "type": type->title, excerpt`;

// Filter for the case studies that have a section to link to
export const listedCaseStudies = `_type == "caseStudy" && defined(slug.current)`;

// Newest first
export const latestCaseStudies = `order(date desc, _createdAt desc)`;

// What a case study's ImageCard shows
const caseStudyCard = `
	_id,
	title,
	partner,
	image{ ${imageFields} },
	${linkTo}
`;

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

// A set of cards, from the Studio's cardsFields, where the page is `page` above
const cardsFields = (page) => `
	"count": coalesce(count, 4),
	"picked": source == "picked",
	source == "picked" => {
		"cards": (documents[]->)[${listedResearch}]{ ${researchCard} }
	},
	source != "picked" => {
		"cards": *[
			${listedResearch}
			&& _type == coalesce(^.kind, "research")
			&& (!defined(^.label) || ^.label._ref in [...themes[]._ref, ...fields[]._ref])
			&& _id != ${page}._id
		] | ${latestResearch}[0...12]{ ${researchCard} }
	},
	${buttonsFields}
`;

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
		${text},
		${buttonsFields}
	},
	_type == "textMediaModule" => {
		mediaType,
		layout,
		side,
		imageShape,
		${text},
		${buttonsFields},
		${images},
		${video},
		showCards == true => { cards{ heading, ${cardsFields('^.^.^')} } }
	},
	_type == "videoModule" => { ${video} },
	_type == "galleryModule" => { display, ${images} },
	_type == "imagesModule" => { ${images} },
	_type == "quoteModule" => { quote, attribution },
	_type == "detailsModule" => { groups[]{ _key, heading, ${text}, links[]{ _key, ${linkFields} } } },
	_type == "cardsModule" => {
		${text},
		${cardsFields('^.^')}
	},
	_type == "caseStudiesModule" => {
		"caseStudies": select(
			source == "picked" => (documents[]->)[${listedCaseStudies}]{ ${caseStudyCard} },
			*[${listedCaseStudies}] | ${latestCaseStudies}[0...3]{ ${caseStudyCard} }
		),
		${buttonsFields}
	},
	_type == "accordionModule" => { items[]{ _key, title, ${text} } },
	_type == "namesModule" => { names[]{ ${portableTextFields} } },
	_type == "openCallsModule" => {
		calls[]{ _key, title, text, image{ ${imageFields} }, url, closesOn }
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
			${buttonsFields},
			"role": role._ref,
			"people": select(
				defined(role) => *[_type == "person" && references(^.role._ref)]{ ${personCard} },
				people[]->{ ${personCard} }
			)
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
