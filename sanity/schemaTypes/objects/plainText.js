import {defineArrayMember, defineType} from 'sanity'
import {linkAnnotation} from './linkTarget'

/**
 * Lines of text and links, nothing else: no headings, lists or bold. Each
 * line shows as its own line on the site, and an empty line as a gap.
 */
export default defineType({
  name: 'plainText',
  type: 'array',
  title: 'Text',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [{title: 'Normal', value: 'normal'}],
      lists: [],
      marks: {
        decorators: [],
        annotations: [linkAnnotation],
      },
    }),
  ],
})
