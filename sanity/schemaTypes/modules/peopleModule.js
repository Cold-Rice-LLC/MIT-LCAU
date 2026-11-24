import {UsersIcon} from '@sanity/icons/Users'
import {defineField, defineType} from 'sanity'
import {buttonsFields, radioField, referencesField} from '../fields'
import {headingField} from './headingField'

const isTabs = (parent) => parent?.display === 'tabs'

/**
 * People as a grid, like "SPURS Current Fellows": everyone with a role,
 * or people picked one by one. Or as role tabs, like the About page's:
 * the first four people with each role, alphabetically, and a link to
 * the People page.
 */
export default defineType({
  name: 'peopleModule',
  type: 'object',
  title: 'People',
  icon: UsersIcon,
  fields: [
    headingField(),
    radioField('display', 'Display', {Grid: 'grid', 'Role tabs': 'tabs'}),
    defineField({
      name: 'text',
      type: 'richText',
      title: 'Text',
      hidden: ({parent}) => isTabs(parent),
    }),
    defineField({
      name: 'role',
      type: 'reference',
      title: 'Everyone With Role',
      description: 'Leave empty to pick people below instead.',
      to: [{type: 'role'}],
      hidden: ({parent}) => isTabs(parent),
    }),
    referencesField('people', 'People', 'person', {
      hidden: ({parent}) => isTabs(parent) || Boolean(parent?.role),
    }),
    ...buttonsFields({
      note: 'Purple text under the grid, like “See Past SPURS Fellows”.',
      links: 'Under the grid and note, like “Visit People”.',
      hidden: ({parent}) => isTabs(parent),
    }),
    referencesField('roles', 'Roles', 'role', {
      description: 'One tab each, in this order. The first is selected to start.',
      validation: (rule) =>
        rule
          .unique()
          .custom((roles, {parent}) =>
            isTabs(parent) && !roles?.length ? 'Pick at least one role' : true,
          ),
      hidden: ({parent}) => !isTabs(parent),
    }),
  ],
  preview: {
    select: {heading: 'heading', display: 'display', role: 'role.title'},
    prepare: ({heading, display, role}) => ({
      title: heading ?? 'People',
      subtitle: display === 'tabs' ? 'People: role tabs' : role ? `People: ${role}` : 'People',
    }),
  },
})
