import {BulbOutlineIcon} from '@sanity/icons/BulbOutline'
import {defineField, defineType} from 'sanity'
import {dateField, imageField, slugField, titleField} from '../fields'

/**
 * A collaboration with a partner: a section of the Case Studies page, at
 * /collaborations/case-studies#…, and a card that links to it.
 */
export default defineType({
  name: 'caseStudy',
  type: 'document',
  title: 'Case Study',
  icon: BulbOutlineIcon,
  fields: [
    titleField({description: 'For cards.'}),
    defineField({
      name: 'partner',
      type: 'string',
      title: 'Partner',
      description: 'The heading on the Case Studies page, and under the title on cards.',
      validation: (rule) => rule.required(),
    }),
    slugField({
      description: 'For links to its section of the Case Studies page.',
      options: {source: 'partner'},
    }),
    dateField({description: 'For their order, newest first. Doesn’t show on the site.'}),
    imageField({description: 'Cropped to 3:2 around the hotspot. Cards leave out its caption.'}),
    defineField({
      name: 'text',
      type: 'richText',
      title: 'Text',
      description: 'On the Case Studies page, beside the image.',
    }),
  ],
  orderings: [{title: 'Newest', name: 'dateDesc', by: [{field: 'date', direction: 'desc'}]}],
  preview: {
    select: {title: 'title', subtitle: 'partner', media: 'image'},
  },
})
