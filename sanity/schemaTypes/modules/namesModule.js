import {OlistIcon} from '@sanity/icons/Olist'
import {defineField, defineType} from 'sanity'
import {headingField} from './headingField'

/** A long list of names in four columns, like the Education page's Past Scholars. */
export default defineType({
  name: 'namesModule',
  type: 'object',
  title: 'Names',
  icon: OlistIcon,
  fields: [
    headingField(),
    defineField({
      name: 'names',
      type: 'plainText',
      title: 'Names',
      description:
        'One to a line. They fill four columns evenly, each from top to bottom, and can be links.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {heading: 'heading', names: 'names'},
    prepare: ({heading, names = []}) => ({
      title: heading ?? 'Names',
      subtitle: `${names.length} names`,
    }),
  },
})
