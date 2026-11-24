/**
 * A function that gets a date's parts by name (year, month, day…), as
 * `options` for Intl.DateTimeFormat have them.
 */
export const datePartsFormat = (options) => {
	const format = new Intl.DateTimeFormat('en-US', options);
	return (date) =>
		Object.fromEntries(
			format.formatToParts(new Date(date)).map(({ type, value }) => [type, value])
		);
};

/**
 * A date field's "2026-03-09" as "March 9, 2026", read as UTC so it doesn't
 * slip back a day.
 */
export const formatDate = (date) =>
	date && new Date(date).toLocaleDateString('en-US', { dateStyle: 'long', timeZone: 'UTC' });
