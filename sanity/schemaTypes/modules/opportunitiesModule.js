import {CaseIcon} from '@sanity/icons/Case'
import {defineField, defineType} from 'sanity'
import {headingField} from './headingField'

/**
 * Every open opportunity, newest first, then some text under the list,
 * like "Employment at MIT". The list hides when nothing's open.
 */
export default defineType({
  name: 'opportunitiesModule',
  type: 'object',
  title: 'Opportunities',
  icon: CaseIcon,
  fields: [
    headingField(),
    defineField({
      name: 'subheading',
      type: 'string',
      title: 'Subheading',
      description: 'Over the text under the list.',
    }),
    defineField({
      name: 'text',
      type: 'richText',
      title: 'Text',
    }),
  ],
  preview: {
    select: {heading: 'heading'},
    prepare: ({heading}) => ({title: heading ?? 'Opportunities', subtitle: 'Opportunities'}),
  },
})
