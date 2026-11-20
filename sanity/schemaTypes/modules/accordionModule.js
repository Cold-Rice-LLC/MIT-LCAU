import {UlistIcon} from '@sanity/icons/Ulist'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {headingField} from './headingField'

/** Questions or topics that open one at a time, like the SPURS FAQ. */
export default defineType({
  name: 'accordionModule',
  type: 'object',
  title: 'Accordion',
  icon: UlistIcon,
  fields: [
    headingField(),
    defineField({
      name: 'items',
      type: 'array',
      title: 'Items',
      of: [
        defineArrayMember({
          name: 'accordionItem',
          type: 'object',
          title: 'Item',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Title',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'text',
              type: 'richText',
              title: 'Text',
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {heading: 'heading', items: 'items'},
    prepare: ({heading, items = []}) => ({
      title: heading ?? 'Accordion',
      subtitle: `Accordion, ${items.length} items`,
    }),
  },
})
