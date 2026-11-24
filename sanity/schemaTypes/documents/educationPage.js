import {BookIcon} from '@sanity/icons/Book'
import {defineType} from 'sanity'
import {
  modulesField,
  onThisPageField,
  seoField,
  slugField,
  subtitleField,
  titleField,
} from '../fields'

/** A program under Education, at /education/…, like the PhD Program or SPURS. */
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
    onThisPageField({initialValue: true}),
    modulesField(),
    seoField(),
  ],
  preview: {
    select: {title: 'title', subtitle: 'subtitle'},
  },
})
