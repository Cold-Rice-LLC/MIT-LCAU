import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	NOINDEX: {
		description: 'Set to true on staging to keep every page out of search engines.',
		schema: (value) => value === 'true'
	}
});
