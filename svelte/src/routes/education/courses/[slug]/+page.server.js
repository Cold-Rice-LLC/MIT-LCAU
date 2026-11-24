import { loadDetail } from '#lib/sanity/detail.js';

/** A course, by slug. Its URL puts it under Education in the menu. */
export const load = ({ params }) => loadDetail('course', params.slug, 'year');
