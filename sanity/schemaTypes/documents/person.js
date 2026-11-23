import {UserIcon} from '@sanity/icons/User'
import {defineField, defineType} from 'sanity'
import {imageField, referencesField, seoField, slugField} from '../fields'

/**
 * Someone at or connected to LCAU. Their research and courses list on
 * their page from the projects and courses that name them.
 */
export default defineType({
  name: 'person',
  type: 'document',
  title: 'Person',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (rule) => rule.required(),
    }),
    slugField({options: {source: 'name'}}),
    referencesField('roles', 'Roles', 'role', {
      description: 'The first shows as their tag. Every one adds them to that Role filter.',
      validation: (rule) => rule.required().min(1).unique(),
    }),
    defineField({
      name: 'positions',
      type: 'array',
      title: 'Positions',
      description: 'Like “Faculty Director” or “Associate Professor of Urban Planning”.',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'cohort',
      type: 'number',
      title: 'Fellowship Year',
      description: 'For SPURS fellows and visiting scholars, as “2026 SPURS Fellow”.',
      validation: (rule) => rule.integer().min(1900).max(2100),
    }),
    imageField({
      name: 'photo',
      title: 'Photo',
      description: 'Cropped to 3:2 around the hotspot.',
    }),
    defineField({
      name: 'bio',
      type: 'richText',
      title: 'Bio',
    }),
    defineField({
      name: 'office',
      type: 'string',
      title: 'Office',
      description: 'Like “E14-140D”.',
    }),
    defineField({
      name: 'email',
      type: 'email',
      title: 'Email',
    }),
    defineField({
      name: 'links',
      type: 'array',
      title: 'Links',
      description: 'Like Google Scholar or a lab website.',
      of: [{type: 'navLink'}],
    }),
    seoField(),
  ],
  orderings: [{title: 'Name', name: 'nameAsc', by: [{field: 'name', direction: 'asc'}]}],
  preview: {
    select: {title: 'name', subtitle: 'roles.0.title', media: 'photo'},
  },
})
