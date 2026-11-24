import { redirect } from '@sveltejs/kit';

// Exhibitions list in the Index
export const load = () => redirect(307, '/research/all?type=exhibitions');
