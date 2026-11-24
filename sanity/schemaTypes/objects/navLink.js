import {defineField, defineType} from 'sanity'
import {linkTargetFields, linkTargetSelect, linkTargetSubtitle} from './linkTarget'

/**
 * A label plus a destination: menu links, Explore links, footer links and
 * the like. The site resolves it with linkFields and linkHref
 * (svelte/src/lib/sanity/links.js).
 */
export default defineType({
  name: 'navLink',
  type: 'object',
  title: 'Link',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      title: 'Label',
      validation: (rule) => rule.required(),
    }),
    ...linkTargetFields({required: true, files: true}),
  ],
  preview: {
    select: {label: 'label', ...linkTargetSelect},
    prepare: ({label, ...link}) => ({title: label, subtitle: linkTargetSubtitle(link)}),
  },
})
