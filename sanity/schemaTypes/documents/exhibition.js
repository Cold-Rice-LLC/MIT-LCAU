import {ImagesIcon} from '@sanity/icons/Images'
import {defineField, defineType} from 'sanity'
import {
  classificationFields,
  excerptField,
  imageField,
  modulesField,
  onThisPageField,
  referencesField,
  seoField,
  slugField,
  subtitleField,
  titleField,
} from '../fields'

/** An exhibition, at /research/exhibitions/…, listed in the Research Index. */
export default defineType({
  name: 'exhibition',
  type: 'document',
  title: 'Exhibition',
  icon: ImagesIcon,
  fieldsets: [{name: 'when', title: 'When and Where', options: {columns: 2}}],
  fields: [
    titleField(),
    slugField(),
    subtitleField(),
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
      name: 'datesLabel',
      type: 'string',
      title: 'Dates, as Text',
      description:
        'Shows instead of the dates, like “2023” when the days aren’t known. They still sort and filter it.',
      fieldset: 'when',
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Location',
      fieldset: 'when',
    }),
    ...classificationFields(),
    excerptField(),
    imageField(),
    onThisPageField({initialValue: true}),
    modulesField(),
    referencesField('relatedResearch', 'Related Research', 'research', {
      description: 'Above More Exhibitions, at the end of the page. Left out when empty.',
    }),
    seoField(),
  ],
  orderings: [
    {title: 'Opening Date', name: 'startDesc', by: [{field: 'startDate', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title', subtitle: 'startDate', media: 'image'},
  },
})
