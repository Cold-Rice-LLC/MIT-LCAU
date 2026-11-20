import {BlockquoteIcon} from '@sanity/icons/Blockquote'
import {defineField, defineType} from 'sanity'

/** A pull quote and who said it. */
export default defineType({
  name: 'quoteModule',
  type: 'object',
  title: 'Quote',
  icon: BlockquoteIcon,
  fields: [
    defineField({
      name: 'quote',
      type: 'text',
      title: 'Quote',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'attribution',
      type: 'string',
      title: 'Attribution',
    }),
  ],
  preview: {
    select: {title: 'quote', subtitle: 'attribution'},
  },
})
