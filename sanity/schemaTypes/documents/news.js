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

// The Type in lists, and what makes a post More News on another's page
export const newsTypes = [
  {title: 'Announcement', value: 'announcement'},
  {title: 'Call for Proposals', value: 'callForProposals'},
  {title: 'Exhibition Opening', value: 'exhibitionOpening'},
  {title: 'Project Feature', value: 'projectFeature'},
]

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
      type: 'string',
      title: 'Type',
      options: {list: newsTypes},
      validation: (rule) => rule.required(),
    }),
    excerptField({
      description: 'The short description in All News and search results.',
      validation: (rule) => rule.required(),
    }),
    imageField({description: 'For cards. Cropped to 3:2 around the hotspot.'}),
    modulesField(),
    referencesField('relatedNews', 'More News', 'news', {
      description:
        'Up to three posts. Any left empty are filled with the latest of the same type, then the latest of all.',
      validation: (rule) => rule.unique().max(3),
    }),
    seoField(),
  ],
  orderings: [{title: 'Newest', name: 'dateDesc', by: [{field: 'date', direction: 'desc'}]}],
  preview: {
    select: {title: 'title', date: 'date', type: 'type', media: 'image'},
    prepare: ({title, date, type, media}) => ({
      title,
      subtitle: [newsTypes.find(({value}) => value === type)?.title, date]
        .filter(Boolean)
        .join(', '),
      media,
    }),
  },
})
