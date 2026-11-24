import { redirect } from '@sveltejs/kit';

// Courses list in the Index
export const load = () => redirect(307, '/research/all?type=courses');
