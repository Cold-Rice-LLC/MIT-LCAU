import {BellIcon} from '@sanity/icons/Bell'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {imageField, titleField} from '../fields'
import {headingField} from './headingField'

/**
 * Grants to apply for, as cards that open another site in a new tab. The
 * whole section hides once they've all closed.
 */
export default defineType({
  name: 'openCallsModule',
  type: 'object',
  title: 'Open Calls',
  icon: BellIcon,
  fields: [
    headingField({initialValue: 'Open Calls'}),
    defineField({
      name: 'calls',
      type: 'array',
      title: 'Calls',
      description: 'In three columns, filled left to right.',
      of: [
        defineArrayMember({
          name: 'openCall',
          type: 'object',
          title: 'Call',
          fields: [
            titleField(),
            defineField({name: 'text', type: 'text', title: 'Text', rows: 4}),
            imageField({description: 'Optional. Cropped to 3:2 around the hotspot.'}),
            defineField({
              name: 'url',
              type: 'url',
              title: 'URL',
              description: 'Where to apply or learn more. Opens in a new tab.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'closesOn',
              type: 'date',
              title: 'Closes On',
              description: 'The last day it shows. Leave empty to show it until it’s removed.',
            }),
          ],
          preview: {
            select: {title: 'title', closesOn: 'closesOn', media: 'image'},
            prepare: ({title, closesOn, media}) => ({
              title,
              subtitle: closesOn && `Closes ${closesOn}`,
              media,
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {heading: 'heading', calls: 'calls'},
    prepare: ({heading, calls = []}) => ({
      title: heading ?? 'Open Calls',
      subtitle: `Open Calls, ${calls.length}`,
    }),
  },
})
