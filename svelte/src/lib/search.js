import Fuse from 'fuse.js';

/** Lowercase, without accents, for matching and sorting: "Héctor" is "hector". */
export const plain = (text) =>
	(text ?? '')
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase();

// Fuse's score is about the share of a word's letters that are off, so a
// word may be a letter off from four letters long and two from seven
const fuseOptions = { threshold: 0.3, ignoreLocation: true };

/** A function that gets the Set of indexes of the `texts` a misspelt word matches loosely. */
const looseMatcher = (texts) => {
	const fuse = new Fuse(texts, fuseOptions);
	return (word) => new Set(fuse.search(word).map((result) => result.refIndex));
};

const isNumber = (word) => /^\d+$/.test(word);

/**
 * The `items` whose text (`textOf` each) has every word of `query` in it,
 * accents and case aside, so "hector zam" finds "Héctor Zamora". A word
 * nothing has in it is taken as misspelt and matched loosely, so "hectr
 * zamora" finds him too; one something has is matched only as typed, so
 * "alula" doesn't find "Tschabalala". Numbers only match as typed, so
 * 2023 doesn't find 2021. An empty query keeps everything. In their order.
 */
export const fuzzySearch = (items, query, textOf) => {
	const words = plain(query).split(/\s+/).filter(Boolean);
	if (!words.length) return items;

	const texts = items.map((item) => plain(textOf(item)));
	const loosely = looseMatcher(texts);
	const matches = words.map((word) => {
		const exact = texts.flatMap((text, index) => (text.includes(word) ? [index] : []));
		return exact.length || isNumber(word) ? new Set(exact) : loosely(word);
	});
	return items.filter((_, index) => matches.every((found) => found.has(index)));
};

/** The words in `text`, for rankedSearch: "Care & the City" is care, the and city. */
export const wordsOf = (text) => plain(text).match(/[\p{L}\p{N}]+/gu) ?? [];

// What a word is worth in each of an item's texts
const weights = [8, 3, 1];

/**
 * The `items` with every word of `query` in them, best match first: the
 * start of a word is enough, so "urban" finds "Urbanism". Each has its
 * `title`, and as `words` the Sets of wordsOf its title, its summary and
 * its body, worth less in turn; the whole query in the title is worth as
 * much again. Ones that match as well stay in their order. As in
 * fuzzySearch, a word nothing has is taken as misspelt, and matched
 * loosely with titles. An empty query finds nothing.
 */
export const rankedSearch = (items, query) => {
	const words = wordsOf(query);
	if (!words.length) return [];

	const worth = (item, word) => {
		const text = item.words.findIndex((texts) => [...texts].some((w) => w.startsWith(word)));
		return weights[text] ?? 0;
	};

	const loosely = looseMatcher(items.map(({ title }) => plain(title)));
	// For each word, each item's score
	const scores = words.map((word) => {
		const exact = items.map((item) => worth(item, word));
		if (exact.some(Boolean) || isNumber(word)) return exact;
		const close = loosely(word);
		return items.map((_, index) => (close.has(index) ? weights[0] : 0));
	});

	const phrase = words.join(' ');
	return items
		.map((item, index) => {
			const each = scores.map((score) => score[index]);
			if (!each.every(Boolean)) return { item, score: 0 };
			const whole = wordsOf(item.title).join(' ').includes(phrase) ? weights[0] * words.length : 0;
			return { item, score: whole + each.reduce((a, b) => a + b) };
		})
		.filter(({ score }) => score)
		.toSorted((a, b) => b.score - a.score)
		.map(({ item }) => item);
};

/** The heading of a search of the site. */
export const searchTitle = (query) => (query ? `Results for “${query}”` : 'Search');
