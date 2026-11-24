/**
 * A date field's "2026-03-09" as "March 9, 2026", read as UTC so it doesn't
 * slip back a day.
 */
export const formatDate = (date) =>
	date && new Date(date).toLocaleDateString('en-US', { dateStyle: 'long', timeZone: 'UTC' });
