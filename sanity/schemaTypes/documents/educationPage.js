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

/** A program under Education, like the PhD Program or SPURS. */
export default defineType({
  name: 'educationPage',
  type: 'document',
  title: 'Education Page',
  icon: BookIcon,
  fields: [
    titleField(),
    slugField(),
    defineField({
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle',
    }),
    excerptField(),
    imageField(),
    modulesField(),
    referencesField('relatedResearch', 'Related Research', 'research'),
    seoField(),
  ],
  preview: {
    select: {title: 'title', subtitle: 'subtitle', media: 'image'},
  },
})
