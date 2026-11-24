import {BulbOutlineIcon} from '@sanity/icons/BulbOutline'
import {defineField, defineType} from 'sanity'
import {excerptField, imageField, modulesField, seoField, slugField, titleField} from '../fields'

/** A collaboration with a partner, listed under Collaborations. */
export default defineType({
  name: 'caseStudy',
  type: 'document',
  title: 'Case Study',
  icon: BulbOutlineIcon,
  fields: [
    titleField(),
    slugField(),
    defineField({
      name: 'partner',
      type: 'string',
      title: 'Partner',
      description: 'Shows under the title on cards.',
    }),
    excerptField(),
    imageField({
      description: 'For cards and the top of the page. Cropped to 3:2 around the hotspot.',
    }),
    modulesField(),
    seoField(),
  ],
  preview: {
    select: {title: 'title', subtitle: 'partner', media: 'image'},
  },
})
