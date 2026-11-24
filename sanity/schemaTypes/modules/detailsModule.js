import {ThListIcon} from '@sanity/icons/ThList'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {linksField} from '../fields'
import {headingField} from './headingField'

/**
 * Groups of small text, each under its own heading and with any buttons,
 * like Project Credits, Press & Awards or an exhibition's Team.
 */
export default defineType({
  name: 'detailsModule',
  type: 'object',
  title: 'Details',
  icon: ThListIcon,
  fields: [
    headingField(),
    defineField({
      name: 'groups',
      type: 'array',
      title: 'Groups',
      of: [
        defineArrayMember({
          name: 'detailsGroup',
          type: 'object',
          title: 'Group',
          fields: [
            defineField({
              name: 'heading',
              type: 'string',
              title: 'Heading',
              description: 'Like “Press” or “Project Website”. Optional.',
            }),
            defineField({name: 'text', type: 'richText', title: 'Text'}),
            linksField({
              title: 'Buttons',
              description: 'Like “Visit Project Website”, or “Download PDF” with a file.',
            }),
          ],
          preview: {
            select: {heading: 'heading', text: 'text', links: 'links'},
            prepare: ({heading, text, links}) => ({
              title:
                heading ??
                text?.[0]?.children?.map((child) => child.text).join('') ??
                links?.[0]?.label ??
                'Untitled',
            }),
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {heading: 'heading', groups: 'groups'},
    prepare: ({heading, groups = []}) => ({
      title: heading ?? groups[0]?.heading ?? 'Details',
      subtitle: 'Details',
    }),
  },
})
