import {SplitHorizontalIcon} from '@sanity/icons/SplitHorizontal'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {headingField} from './headingField'

/** Two or three columns of text side by side, like the About page's Contact. */
export default defineType({
  name: 'columnsModule',
  type: 'object',
  title: 'Columns',
  icon: SplitHorizontalIcon,
  fields: [
    headingField(),
    defineField({
      name: 'columns',
      type: 'array',
      title: 'Columns',
      of: [
        defineArrayMember({
          name: 'column',
          type: 'object',
          title: 'Column',
          fields: [
            defineField({name: 'heading', type: 'string', title: 'Heading'}),
            defineField({name: 'text', type: 'richText', title: 'Text'}),
          ],
          preview: {select: {title: 'heading'}},
        }),
      ],
      validation: (rule) => rule.required().min(2).max(3),
    }),
  ],
  preview: {
    select: {heading: 'heading', columns: 'columns'},
    prepare: ({heading, columns = []}) => ({
      title: heading ?? 'Columns',
      subtitle: `${columns.length} columns`,
    }),
  },
})
