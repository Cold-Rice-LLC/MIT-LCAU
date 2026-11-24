/**
 * GROQ projection for a document a link points to: its type and slug,
 * which is all linkHref needs to find it on the site.
 */
export const internalFields = `_id, _type, "slug": slug.current`;

/**
 * GROQ projection for a link with a Link Type of internal, external or
 * file. Internal links come back as the target document's internalFields,
 * with the suffix (a #section or ?filter) that follows its URL.
 */
export const linkFields = `
	label,
	linkType,
	externalUrl,
	suffix,
	"fileUrl": file.asset->url,
	"internal": internalLink->{ ${internalFields} }
`;

/** GROQ projection for what Buttons shows: a note and links. */
export const buttonsFields = `note, links[]{ _key, ${linkFields} }`;

/**
 * GROQ projection for a plainText or richText field's blocks, with each
 * link mark's page resolved the way linkFields resolves it.
 */
export const portableTextFields = `
	...,
	markDefs[]{ ..., "internal": internalLink->{ ${internalFields} } }
`;

// Where each linkable document type lives on the site
const paths = {
	page: (slug) => `/${slug}`,
	person: (slug) => `/people/${slug}`,
	event: (slug) => `/events/${slug}`,
	research: (slug) => `/research/${slug}`,
	exhibition: (slug) => `/research/exhibitions/${slug}`,
	course: (slug) => `/education/courses/${slug}`,
	educationPage: (slug) => `/education/${slug}`,
	news: (slug) => `/news/${slug}`,
	opportunity: (slug) => `/about/opportunities/${slug}`,
	// A section of the page, so it's the link's whole suffix
	caseStudy: (slug) => `/collaborations/case-studies#${slug}`
};

/** The href for a link, or null when it points nowhere. */
export const linkHref = (link) => {
	if (link?.linkType === 'external') return link.externalUrl || null;
	if (link?.linkType === 'file') return link.fileUrl || null;
	if (link?.linkType !== 'internal' || !link.internal) return null;

	const { _id, _type, slug } = link.internal;
	const path = _id === 'homepage' ? '/' : slug && paths[_type]?.(slug);
	if (!path) return null;
	return path.includes('#') ? path : path + (link.suffix ?? '');
};

// Opens in a new tab: files and web URLs, not mailto:/tel:
export const isExternalLink = (link) =>
	link?.linkType === 'file' ||
	(link?.linkType === 'external' && /^https?:/.test(link.externalUrl ?? ''));
