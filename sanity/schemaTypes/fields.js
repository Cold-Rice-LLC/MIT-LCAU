import {defineField} from 'sanity'

/**
 * Fields most document types share, so they read and validate the same
 * everywhere.
 */

// Every type a link can point at, and so every type with its own URL
export const linkableTypes = [
  'page',
  'person',
  'event',
  'research',
  'exhibition',
  'course',
  'educationPage',
  'news',
  'opportunity',
  'caseStudy',
]

export const titleField = (options = {}) =>
  defineField({
    name: 'title',
    type: 'string',
    title: 'Title',
    validation: (rule) => rule.required(),
    ...options,
  })

export const slugField = (options = {}) =>
  defineField({
    name: 'slug',
    type: 'slug',
    title: 'Slug',
    description: 'The last part of the page’s URL.',
    options: {source: 'title'},
    validation: (rule) => rule.required(),
    ...options,
  })

export const excerptField = (options = {}) =>
  defineField({
    name: 'excerpt',
    type: 'text',
    title: 'Excerpt',
    description: 'The short description on cards and in lists.',
    rows: 3,
    ...options,
  })

export const imageField = (options = {}) =>
  defineField({
    name: 'image',
    type: 'figure',
    title: 'Image',
    description: 'For cards and the top of the page. Cropped to 3:2 around the hotspot.',
    ...options,
  })

export const modulesField = (options = {}) =>
  defineField({
    name: 'modules',
    type: 'modules',
    title: 'Content',
    ...options,
  })

export const seoField = (options = {}) =>
  defineField({
    name: 'seo',
    type: 'seo',
    title: 'SEO',
    ...options,
  })

export const referencesField = (name, title, to, options = {}) =>
  defineField({
    name,
    type: 'array',
    title,
    of: [{type: 'reference', to: [].concat(to).map((type) => ({type}))}],
    validation: (rule) => rule.unique(),
    ...options,
  })

/**
 * Spread into a field to show it only where `applies`, a test of the
 * field's context (its `parent` and `document`). Given `required`, it's
 * required there, with that message. `rule` starts the validation off,
 * e.g. with the URL schemes it accepts.
 */
export const shownWhere = (applies, {required, rule: base = (rule) => rule} = {}) => ({
  hidden: (context) => !applies(context),
  validation: (rule) =>
    base(rule).custom((value, context) => {
      if (!applies(context)) return true
      return value ? true : (required ?? true)
    }),
})
