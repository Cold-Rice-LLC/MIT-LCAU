import {TagIcon} from '@sanity/icons/Tag'
import {defineField, defineType} from 'sanity'
import {titleField} from '../fields'

/**
 * A role people have, like Administrative Staff: the tag on their card,
 * and a filter wherever people are listed by role.
 */
export default defineType({
  name: 'role',
  type: 'document',
  title: 'Role',
  icon: TagIcon,
  fields: [
    titleField({description: 'One person’s role, as on their card: “PhD Student”.'}),
    defineField({
      name: 'pluralTitle',
      type: 'string',
      title: 'Plural Title',
      description: 'For filters: “PhD Students”. Leave empty if it’s the same.',
    }),
  ],
  orderings: [{title: 'Title', name: 'titleAsc', by: [{field: 'title', direction: 'asc'}]}],
  preview: {
    select: {title: 'title', subtitle: 'pluralTitle'},
  },
})
