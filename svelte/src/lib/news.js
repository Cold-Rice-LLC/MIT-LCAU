// The Studio's news types (sanity/schemaTypes/documents/news.js), by value
const typeLabels = {
	announcement: 'Announcement',
	callForProposals: 'Call for Proposals',
	exhibitionOpening: 'Exhibition Opening',
	projectFeature: 'Project Feature'
};

/** A news type's label, like "Project Feature" for `projectFeature`. */
export const typeLabel = (value) => typeLabels[value];
