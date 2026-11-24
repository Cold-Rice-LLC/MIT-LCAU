import {defineField} from 'sanity'
import {titleField} from '../fields'
import {labelType} from '../labelType'

/**
 * A role people have, like Administrative Staff: the tag on their card,
 * and a filter wherever people are listed by role.
 */
export default labelType('role', 'Role', {
  fields: [
    titleField({description: 'One person’s role, as on their card: “PhD Student”.'}),
    defineField({
      name: 'pluralTitle',
      type: 'string',
      title: 'Plural Title',
      description: 'For filters and tabs: “PhD Students”. Leave empty if it’s the same.',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'pluralTitle'},
  },
})
