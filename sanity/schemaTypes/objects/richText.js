import {defineArrayMember, defineType} from 'sanity'
import {linkAnnotation} from './linkTarget'

/**
 * Formatted text: paragraphs, H3 subheadings, lists, and links to pages
 * on the site or anywhere else.
 */
export default defineType({
  name: 'richText',
  type: 'array',
  title: 'Text',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Heading', value: 'h3'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Bold', value: 'strong'},
          {title: 'Italic', value: 'em'},
        ],
        annotations: [linkAnnotation],
      },
    }),
  ],
})
