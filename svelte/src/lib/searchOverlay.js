import { goto, preloadData } from '$app/navigation';
import { page } from '$app/state';

/**
 * Site search, at /search, opens over the page it was searched from, with
 * shallow routing: the URL changes and the page stays. Loaded at its own
 * URL, like from a shared link, it's a page itself.
 */

/** Whether a navigation (from beforeNavigate) is to a search, to open over the page instead. */
export const opensSearch = ({ to, from, type, shallow }) =>
	to?.route.id === '/search' && from?.route.id !== '/search' && type !== 'popstate' && !shallow;

/** Opens the search at `url` over the page, or shows it in place of the one that's there. */
export const openSearch = async (url) => {
	const { type, data } = await preloadData(url.href);
	// Something's wrong: its own page shows what
	if (type !== 'loaded' || !data.search) return location.assign(url);
	// How many steps back to the page
	const depth = (page.state.depth ?? 0) + 1;
	await goto(url, { shallow: true, state: { search: data.search, depth } });
};

/** Goes back to the page under the search, however many searches ago that was. */
export const closeSearch = () => history.go(-page.state.depth);
