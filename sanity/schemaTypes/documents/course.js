import {BookIcon} from '@sanity/icons/Book'
import {defineField, defineType} from 'sanity'
import {
  excerptField,
  imageField,
  modulesField,
  referencesField,
  seoField,
  slugField,
  titleField,
} from '../fields'

/** A sponsored course, listed under Education and in the Research Index. */
export default defineType({
  name: 'course',
  type: 'document',
  title: 'Course',
  icon: BookIcon,
  fields: [
    titleField(),
    slugField(),
    defineField({
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle',
    }),
    defineField({
      name: 'year',
      type: 'number',
      title: 'Course Year',
      validation: (rule) => rule.required().integer().min(1900).max(2100),
    }),
    excerptField(),
    imageField(),
    referencesField('people', 'People', 'person', {
      description: 'Lists this course on each person’s page.',
    }),
    modulesField(),
    referencesField('relatedResearch', 'Related Research', 'research'),
    seoField(),
  ],
  orderings: [{title: 'Course Year', name: 'yearDesc', by: [{field: 'year', direction: 'desc'}]}],
  preview: {
    select: {title: 'title', year: 'year', media: 'image'},
    prepare: ({title, year, media}) => ({title, subtitle: year && `${year} Course Year`, media}),
  },
})
