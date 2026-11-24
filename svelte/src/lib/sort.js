/** Compares text for sorting A–Z: case and accents aside, "2" before "10". */
export const { compare } = new Intl.Collator('en', { sensitivity: 'base', numeric: true });
