import {ImagesIcon} from '@sanity/icons/Images'
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

/** An exhibition, listed in the Research Index. */
export default defineType({
  name: 'exhibition',
  type: 'document',
  title: 'Exhibition',
  icon: ImagesIcon,
  fieldsets: [
    {name: 'when', title: 'When and Where', options: {columns: 2}},
    {name: 'credits', title: 'Credits', options: {collapsible: true}},
  ],
  fields: [
    titleField(),
    slugField(),
    defineField({
      name: 'startDate',
      type: 'date',
      title: 'Opens',
      fieldset: 'when',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      type: 'date',
      title: 'Closes',
      fieldset: 'when',
      validation: (rule) =>
        rule.custom((end, {document}) =>
          !end || !document?.startDate || end >= document.startDate
            ? true
            : 'Closes before it opens',
        ),
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Location',
      fieldset: 'when',
    }),
    excerptField(),
    imageField(),
    modulesField(),
    defineField({
      name: 'team',
      type: 'richText',
      title: 'Team',
      fieldset: 'credits',
    }),
    defineField({
      name: 'acknowledgements',
      type: 'richText',
      title: 'Acknowledgements',
      fieldset: 'credits',
    }),
    referencesField('relatedResearch', 'Related Research', 'research'),
    seoField(),
  ],
  orderings: [
    {title: 'Opening Date', name: 'startDesc', by: [{field: 'startDate', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title', subtitle: 'startDate', media: 'image'},
  },
})
