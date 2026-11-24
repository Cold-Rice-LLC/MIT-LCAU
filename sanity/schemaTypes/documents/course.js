import {BookIcon} from '@sanity/icons/Book'
import {defineType} from 'sanity'
import {
  classificationFields,
  excerptField,
  imageField,
  modulesField,
  onThisPageField,
  referencesField,
  seoField,
  slugField,
  subtitleField,
  titleField,
  yearField,
} from '../fields'

/** A sponsored course, at /education/courses/…, also listed in the Research Index. */
export default defineType({
  name: 'course',
  type: 'document',
  title: 'Course',
  icon: BookIcon,
  fields: [
    titleField(),
    slugField(),
    subtitleField(),
    yearField({title: 'Course Year'}),
    ...classificationFields(),
    excerptField(),
    imageField(),
    referencesField('people', 'People', 'person', {
      description: 'Lists this course on each person’s page.',
    }),
    onThisPageField(),
    modulesField(),
    seoField(),
  ],
  orderings: [{title: 'Course Year', name: 'yearDesc', by: [{field: 'year', direction: 'desc'}]}],
  preview: {
    select: {title: 'title', year: 'year', media: 'image'},
    prepare: ({title, year, media}) => ({title, subtitle: year && `${year} Course Year`, media}),
  },
})
