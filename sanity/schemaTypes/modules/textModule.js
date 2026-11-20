import {TextIcon} from '@sanity/icons/Text'
import {defineField, defineType} from 'sanity'
import {headingField} from './headingField'

/** A column of text, with or without a heading. */
export default defineType({
  name: 'textModule',
  type: 'object',
  title: 'Text',
  icon: TextIcon,
  fields: [
    headingField(),
    defineField({
      name: 'text',
      type: 'richText',
      title: 'Text',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {heading: 'heading', text: 'text'},
    prepare: ({heading, text}) => ({
      title: heading ?? text?.[0]?.children?.map((child) => child.text).join(''),
      subtitle: 'Text',
    }),
  },
})
