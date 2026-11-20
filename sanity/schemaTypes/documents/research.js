import {ProjectsIcon} from '@sanity/icons/Projects'
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

/** A research project in the Research Index. */
export default defineType({
  name: 'research',
  type: 'document',
  title: 'Research',
  icon: ProjectsIcon,
  fieldsets: [
    {name: 'credits', title: 'Credits', options: {collapsible: true}},
    {name: 'recognition', title: 'Press and Awards', options: {collapsible: true}},
  ],
  fields: [
    titleField(),
    slugField(),
    defineField({
      name: 'year',
      type: 'number',
      title: 'Year',
      validation: (rule) => rule.required().integer().min(1900).max(2100),
    }),
    excerptField(),
    imageField(),
    referencesField('people', 'People', 'person', {
      description: 'Lists this project on each person’s page.',
    }),
    modulesField(),
    defineField({
      name: 'credits',
      type: 'richText',
      title: 'Credits',
      fieldset: 'credits',
    }),
    defineField({
      name: 'websiteUrl',
      type: 'url',
      title: 'Project Website',
      fieldset: 'credits',
    }),
    defineField({
      name: 'pdf',
      type: 'file',
      title: 'PDF',
      description: 'Offered as “Download PDF”.',
      fieldset: 'credits',
      options: {accept: 'application/pdf'},
    }),
    defineField({
      name: 'press',
      type: 'richText',
      title: 'Press',
      fieldset: 'recognition',
    }),
    defineField({
      name: 'awards',
      type: 'richText',
      title: 'Awards',
      fieldset: 'recognition',
    }),
    referencesField('relatedResearch', 'Related Research', 'research', {
      description: 'Leave empty to show the latest projects.',
    }),
    seoField(),
  ],
  orderings: [{title: 'Year', name: 'yearDesc', by: [{field: 'year', direction: 'desc'}]}],
  preview: {
    select: {title: 'title', subtitle: 'year', media: 'image'},
  },
})
