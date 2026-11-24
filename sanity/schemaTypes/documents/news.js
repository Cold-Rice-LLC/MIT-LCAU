import {DocumentTextIcon} from '@sanity/icons/DocumentText'
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

/** A news post. */
export default defineType({
  name: 'news',
  type: 'document',
  title: 'News',
  icon: DocumentTextIcon,
  fields: [
    titleField(),
    slugField(),
    defineField({
      name: 'date',
      type: 'date',
      title: 'Date',
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      type: 'reference',
      title: 'Type',
      to: [{type: 'newsType'}],
      validation: (rule) => rule.required(),
    }),
    excerptField({
      description: 'The short description in All News and search results.',
      validation: (rule) => rule.required(),
    }),
    imageField({description: 'For cards. Cropped to 3:2 around the hotspot.'}),
    modulesField(),
    referencesField('relatedNews', 'Related News', 'news', {
      description:
        'Up to three posts. Any left empty are filled with the latest of the same type, then the latest of all.',
      validation: (rule) => rule.unique().max(3),
    }),
    seoField(),
  ],
  orderings: [{title: 'Newest', name: 'dateDesc', by: [{field: 'date', direction: 'desc'}]}],
  preview: {
    select: {title: 'title', date: 'date', type: 'type.title', media: 'image'},
    prepare: ({title, date, type, media}) => ({
      title,
      subtitle: [type, date].filter(Boolean).join(', '),
      media,
    }),
  },
})
