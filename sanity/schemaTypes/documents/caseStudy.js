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
    imageField(),
    modulesField(),
    seoField(),
  ],
  preview: {
    select: {title: 'title', subtitle: 'partner', media: 'image'},
  },
})
