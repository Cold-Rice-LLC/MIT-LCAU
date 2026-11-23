/**
 * Chrome (155, at least) rebuilds a page's @font-face fonts whenever its URL
 * changes, even through history.replaceState, and draws the fallbacks for a
 * frame or two while they reload: a flash of Helvetica on every page change
 * and every keystroke in a search that updates the query. Fonts added from
 * script aren't rebuilt, so this adds each @font-face again as a FontFace,
 * once it has loaded. With the same descriptors, the later one is used. The
 * @font-face rules still give the first paint.
 */
export const keepFonts = async () => {
	const faces = new Map();
	for (const sheet of document.styleSheets) {
		let rules;
		try {
			rules = sheet.cssRules;
		} catch {
			continue; // Another origin's sheet
		}
		for (const rule of rules) {
			if (!(rule instanceof CSSFontFaceRule)) continue;
			const { style } = rule;
			const family = style.getPropertyValue('font-family').replace(/^["']|["']$/g, '');
			const descriptors = {
				weight: style.getPropertyValue('font-weight') || 'normal',
				style: style.getPropertyValue('font-style') || 'normal',
				display: style.getPropertyValue('font-display') || 'auto'
			};
			// Dev serves the stylesheet twice for a moment: one of each
			faces.set(`${family} ${descriptors.weight} ${descriptors.style}`, [
				family,
				style.getPropertyValue('src'),
				descriptors
			]);
		}
	}

	await Promise.all(
		[...faces.values()].map(async (args) => {
			const face = await new FontFace(...args).load();
			document.fonts.add(face);
		})
	);
};
