import { dev } from '$app/environment';
import { hasEnded } from '#lib/events.js';
import { fetchCards } from '#lib/sanity/cards.js';
import { client } from '#lib/sanity/client.js';
import { listedFeed } from '#lib/sanity/modules.js';
import { rankedSearch, wordsOf } from '#lib/search.js';
import { pageRange, paging } from '#lib/url.js';

const PAGE_SIZE = 12;
const INDEX_AGE = 60_000;

const listed = `
	${listedFeed}
	|| (_type in ["person", "educationPage", "caseStudy"] && defined(slug.current))
	|| (_type == "opportunity" && open != false && defined(slug.current))
	|| (_type == "page" && _id != "homepage" && defined(slug.current))
`;

// Every document's text. Those without a date, like people and pages, come
// first, then the latest, which is how equal matches stay.
const indexQuery = `*[${listed}]{
	_id,
	"title": coalesce(title, name),
	"date": coalesce(start, date, startDate, string(year), postedOn),
	"summary": [
		headline,
		subtitle,
		excerpt,
		partner,
		location,
		type->title,
		positions,
		roles[]->title,
		themes[]->title,
		fields[]->title,
		people[]->name
	],
	"body": [
		pt::text(intro),
		pt::text(bio),
		pt::text(text),
		pt::text(body),
		pt::text(details),
		pt::text(howToApply),
		modules[]{
			"text": [
				heading,
				quote,
				attribution,
				pt::text(text),
				items[]{ "text": [title, pt::text(text)] }.text,
				groups[]{ "text": [heading, pt::text(text)] }.text,
				columns[]{ "text": [heading, pt::text(text)] }.text,
				pt::text(names),
				people[]->name
			]
		}.text
	]
} | order(defined(date) asc, date desc)`;

const allWords = (texts) => new Set(wordsOf([texts].flat(Infinity).filter(Boolean).join(' ')));

const loadIndex = async () => {
	const docs = await client.fetch(indexQuery);
	return docs.map(({ _id, title, summary, body }) => ({
		_id,
		title,
		words: [title, summary, body].map(allWords)
	}));
};

// Kept for a minute, except locally, where edits show on reload
let index;
let expires = 0;
const getIndex = () => {
	if (dev || !index || Date.now() > expires) {
		expires = Date.now() + INDEX_AGE;
		index = loadIndex();
		// Not a failed one
		index.catch(() => (expires = 0));
	}
	return index;
};

// The menu link a result sits under, where its URL isn't under it (see activeTrail)
const menuParent = (doc, now) => {
	if (doc._type === 'event') return hasEnded(doc, now) ? '/events/all' : '/events';
	if (doc._type === 'research' || doc._type === 'exhibition') return '/research/all';
	if (doc._type === 'caseStudy') return '/collaborations/case-studies';
};

/**
 * What a search of the site shows, from `url`: its `?q=`, and the 12
 * results on its `?page=`, best match first.
 */
export const searchSite = async (url) => {
	const query = (url.searchParams.get('q') ?? '').trim();
	const { page, start, end } = pageRange(url, PAGE_SIZE);
	const matches = query ? rankedSearch(await getIndex(), query) : [];

	const now = new Date();
	const results = await fetchCards(matches.slice(start, end).map(({ _id }) => _id));
	return {
		query,
		results: results.map((doc) => ({ ...doc, menuParent: menuParent(doc, now) })),
		...paging(page, matches.length, PAGE_SIZE)
	};
};
