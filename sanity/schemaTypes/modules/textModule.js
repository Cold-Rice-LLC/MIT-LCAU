import {TextIcon} from '@sanity/icons/Text'
import {defineField, defineType} from 'sanity'
import {radioField} from '../fields'
import {headingField} from './headingField'

/**
 * A column of text, with or without a heading: regular paragraphs, or
 * large text across more of the page, like the About page's Mission.
 * Over regular text, the heading can be small, like the Privacy
 * Statement's sections.
 */
export default defineType({
  name: 'textModule',
  type: 'object',
  title: 'Text',
  icon: TextIcon,
  fields: [
    headingField(),
    radioField(
      'headingStyle',
      'Heading Style',
      {'Large, centered': 'large', 'Small, over the text': 'small'},
      {hidden: ({parent}) => !parent?.heading || parent?.size === 'large'},
    ),
    defineField({
      name: 'text',
      type: 'richText',
      title: 'Text',
      validation: (rule) => rule.required(),
    }),
    radioField('size', 'Size', {Regular: 'regular', Large: 'large'}),
  ],
  preview: {
    select: {heading: 'heading', text: 'text'},
    prepare: ({heading, text}) => ({
      title: heading ?? text?.[0]?.children?.map((child) => child.text).join(''),
      subtitle: 'Text',
    }),
  },
})
