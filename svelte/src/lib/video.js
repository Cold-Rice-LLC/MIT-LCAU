/**
 * The player URL for a YouTube or Vimeo page's video, or null for any
 * other URL. With `autoplay`, it plays as soon as it loads, as when its
 * poster is clicked.
 */
export const embedUrl = (url, autoplay = false) => {
	let parsed;
	try {
		parsed = new URL(url);
	} catch {
		return null;
	}
	const host = parsed.hostname.replace(/^(www|m)\./, '');
	const path = parsed.pathname.split('/').filter(Boolean);

	if (host === 'youtu.be' || host === 'youtube.com' || host === 'youtube-nocookie.com') {
		const id =
			host === 'youtu.be'
				? path[0]
				: ['embed', 'shorts', 'live'].includes(path[0])
					? path[1]
					: parsed.searchParams.get('v');
		return id ? `https://www.youtube-nocookie.com/embed/${id}?rel=0&autoplay=${+autoplay}` : null;
	}

	if (host === 'vimeo.com' || host === 'player.vimeo.com') {
		// vimeo.com/123, vimeo.com/123/hash, player.vimeo.com/video/123?h=hash
		const [id, hash] = path[0] === 'video' ? [path[1], parsed.searchParams.get('h')] : path;
		if (!/^\d+$/.test(id ?? '')) return null;
		return `https://player.vimeo.com/video/${id}?autoplay=${+autoplay}${hash ? `&h=${hash}` : ''}`;
	}

	return null;
};
