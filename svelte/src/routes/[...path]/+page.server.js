import { loadPage } from '#lib/sanity/page.js';

/** Any page under Pages in the Studio without a route of its own, by slug. */
export const load = ({ params }) => loadPage(params.path);
