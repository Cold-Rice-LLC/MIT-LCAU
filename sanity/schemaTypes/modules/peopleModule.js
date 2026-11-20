import {UsersIcon} from '@sanity/icons/Users'
import {defineField, defineType} from 'sanity'
import {personRoles} from '../documents/person'
import {headingField} from './headingField'

/**
 * A grid of people, like "SPURS Current Fellows": everyone with a role,
 * or people picked one by one.
 */
export default defineType({
  name: 'peopleModule',
  type: 'object',
  title: 'People',
  icon: UsersIcon,
  fields: [
    headingField(),
    defineField({
      name: 'text',
      type: 'richText',
      title: 'Text',
    }),
    defineField({
      name: 'role',
      type: 'string',
      title: 'Everyone With Role',
      description: 'Leave empty to pick people below instead.',
      options: {list: personRoles},
    }),
    defineField({
      name: 'people',
      type: 'array',
      title: 'People',
      of: [{type: 'reference', to: [{type: 'person'}]}],
      validation: (rule) => rule.unique(),
      hidden: ({parent}) => Boolean(parent?.role),
    }),
  ],
  preview: {
    select: {heading: 'heading', role: 'role'},
    prepare: ({heading, role}) => ({
      title: heading ?? 'People',
      subtitle: role ? `People: ${personRoles.find(({value}) => value === role)?.title}` : 'People',
    }),
  },
})
