import {UserIcon} from '@sanity/icons/User'
import {defineField, defineType} from 'sanity'
import {imageField, seoField, slugField} from '../fields'

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
    defineField({
      name: 'sortName',
      type: 'string',
      title: 'Sort Name',
      description:
        'How they’re alphabetized, like “Sánchez de Madariaga, Inés”. Leave empty to sort by their last word: “Sarah Williams” as “Williams, Sarah”.',
    }),
    slugField({options: {source: 'name'}}),
    defineField({
      name: 'role',
      type: 'reference',
      title: 'Role',
      description: 'Their tag, and the Role filter they’re under.',
      to: [{type: 'role'}],
      validation: (rule) => rule.required(),
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
      name: 'contact',
      type: 'plainText',
      title: 'Contact',
      description:
        'Under the photo, like “Visit Me: E14-140D” and their email as a link. Shift+Enter starts a new line; Enter leaves a line’s space.',
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
  orderings: [
    {title: 'Name', name: 'nameAsc', by: [{field: 'name', direction: 'asc'}]},
    {
      title: 'Sort Name',
      name: 'sortNameAsc',
      by: [
        {field: 'sortName', direction: 'asc'},
        {field: 'name', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {title: 'name', subtitle: 'role.title', media: 'photo'},
  },
})
