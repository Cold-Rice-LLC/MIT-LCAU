/**
 * GROQ projection for a document a link points to: its type and slug,
 * which is all linkHref needs to find it on the site.
 */
export const internalFields = `_id, _type, "slug": slug.current`;

/**
 * GROQ projection for a link with a Link Type of internal or external.
 * Internal links come back as the target document's internalFields.
 */
export const linkFields = `
	label,
	linkType,
	externalUrl,
	"internal": internalLink->{ ${internalFields} }
`;

/**
 * GROQ projection for a plainText field: its lines, with each link mark's
 * page resolved the way linkFields resolves it.
 */
export const plainTextFields = `
	...,
	markDefs[]{ ..., "internal": internalLink->{ ${internalFields} } }
`;

// Where each linkable document type lives on the site
const paths = {
	page: (slug) => `/${slug}`,
	person: (slug) => `/people/${slug}`,
	event: (slug) => `/events/${slug}`,
	research: (slug) => `/research/${slug}`,
	exhibition: (slug) => `/exhibitions/${slug}`,
	course: (slug) => `/courses/${slug}`,
	educationPage: (slug) => `/education/${slug}`,
	news: (slug) => `/news/${slug}`,
	opportunity: (slug) => `/opportunities/${slug}`,
	caseStudy: (slug) => `/case-studies/${slug}`
};

/** The href for a link, or null when it points nowhere. */
export const linkHref = (link) => {
	if (link?.linkType === 'external') return link.externalUrl || null;
	if (link?.linkType !== 'internal' || !link.internal) return null;

	const { _id, _type, slug } = link.internal;
	if (_id === 'homepage') return '/';
	return slug && paths[_type] ? paths[_type](slug) : null;
};

// Opens in a new tab: web URLs only, not mailto:/tel:
export const isExternalLink = (link) =>
	link?.linkType === 'external' && /^https?:/.test(link.externalUrl ?? '');
