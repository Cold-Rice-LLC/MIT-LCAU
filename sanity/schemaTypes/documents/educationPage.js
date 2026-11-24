import {BookIcon} from '@sanity/icons/Book'
import {defineType} from 'sanity'
import {
  excerptField,
  imageField,
  modulesField,
  referencesField,
  seoField,
  slugField,
  subtitleField,
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
    // Courses are under /education/courses
    slugField({reserved: ['courses']}),
    subtitleField(),
    excerptField(),
    imageField({
      description: 'For cards and the top of the page. Cropped to 3:2 around the hotspot.',
    }),
    modulesField(),
    referencesField('relatedResearch', 'Related Research', 'research'),
    seoField(),
  ],
  preview: {
    select: {title: 'title', subtitle: 'subtitle', media: 'image'},
  },
})
