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

/** `reserved` slugs are taken by other pages, like All Events at /events/all. */
export const slugField = ({reserved = [], ...options} = {}) =>
  defineField({
    name: 'slug',
    type: 'slug',
    title: 'Slug',
    description: 'The last part of the page’s URL.',
    options: {source: 'title'},
    validation: (rule) =>
      rule
        .required()
        .custom((slug) => (reserved.includes(slug?.current) ? `“${slug.current}” is taken` : true)),
    ...options,
  })

export const subtitleField = (options = {}) =>
  defineField({
    name: 'subtitle',
    type: 'string',
    title: 'Subtitle',
    description: 'A line under the title. Optional.',
    ...options,
  })

export const yearField = (options = {}) =>
  defineField({
    name: 'year',
    type: 'number',
    title: 'Year',
    validation: (rule) => rule.required().integer().min(1900).max(2100),
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
    description: 'For cards. Cropped to 3:2 around the hotspot.',
    ...options,
  })

export const modulesField = (options = {}) =>
  defineField({
    name: 'modules',
    type: 'modules',
    title: 'Content',
    ...options,
  })

/** Whether a page lists its modules under "On this page" (see onThisPageFields). */
export const onThisPageField = (options = {}) =>
  defineField({
    name: 'onThisPage',
    type: 'boolean',
    title: 'Show “On this page”',
    description:
      'Links to the page’s sections, under the logo. Each section can be renamed there or left out.',
    initialValue: false,
    ...options,
  })

export const seoField = (options = {}) =>
  defineField({
    name: 'seo',
    type: 'seo',
    title: 'SEO',
    ...options,
  })

/**
 * A choice of a few options as radio buttons in a row, the first chosen to
 * start. `choices` maps each option's title to its value, in order.
 */
export const radioField = (name, title, choices, options = {}) =>
  defineField({
    name,
    type: 'string',
    title,
    options: {
      list: Object.entries(choices).map(([title, value]) => ({title, value})),
      layout: 'radio',
      direction: 'horizontal',
    },
    initialValue: Object.values(choices)[0],
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

/** Purple text over buttons (see linksField). */
export const noteField = (options = {}) =>
  defineField({
    name: 'note',
    type: 'string',
    title: 'Note',
    ...options,
  })

export const linksField = (options = {}) =>
  defineField({
    name: 'links',
    type: 'array',
    title: 'Links',
    of: [{type: 'navLink'}],
    ...options,
  })

/** The Theme and Field a research, exhibition or course page is filtered by in the Index. */
export const classificationFields = () => [
  referencesField('themes', 'Themes', 'researchTheme', {
    description: 'Filters in the Index. The first shows on cards, as in “2025, Cities Initiative”.',
  }),
  referencesField('fields', 'Fields', 'researchField', {
    description: 'Filters in the Index, like Transportation. Tags at the top of the page.',
  }),
]

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
