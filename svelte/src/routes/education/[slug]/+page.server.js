import { loadDetail } from '#lib/sanity/detail.js';

/** A program, like the PhD Program or SPURS, by slug. */
export const load = ({ params }) => loadDetail('educationPage', params.slug);
