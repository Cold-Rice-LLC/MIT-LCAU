import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineField, defineType} from 'sanity'
import {excerptField, imageField, modulesField, seoField, slugField, titleField} from '../fields'

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
    }),
    excerptField(),
    imageField(),
    modulesField(),
    seoField(),
  ],
  orderings: [{title: 'Newest', name: 'dateDesc', by: [{field: 'date', direction: 'desc'}]}],
  preview: {
    select: {title: 'title', subtitle: 'date', media: 'image'},
  },
})
