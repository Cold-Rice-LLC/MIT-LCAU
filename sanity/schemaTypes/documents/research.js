import {ProjectsIcon} from '@sanity/icons/Projects'
import {defineType} from 'sanity'
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
  yearField,
} from '../fields'

/** A research project, at /research/…, listed in the Research Index. */
export default defineType({
  name: 'research',
  type: 'document',
  title: 'Research',
  icon: ProjectsIcon,
  fields: [
    titleField(),
    // The Index is /research/all, and exhibitions are under /research/exhibitions
    slugField({reserved: ['all', 'exhibitions']}),
    subtitleField(),
    yearField(),
    ...classificationFields(),
    excerptField(),
    imageField(),
    referencesField('people', 'People', 'person', {
      description: 'Lists this project on each person’s page.',
    }),
    onThisPageField({initialValue: true}),
    modulesField(),
    referencesField('relatedResearch', 'Related Research', 'research', {
      description:
        'Up to four projects. Leave empty for the latest, starting with those that share a theme.',
      validation: (rule) => rule.unique().max(4),
    }),
    seoField(),
  ],
  orderings: [{title: 'Year', name: 'yearDesc', by: [{field: 'year', direction: 'desc'}]}],
  preview: {
    select: {title: 'title', year: 'year', theme: 'themes.0.title', media: 'image'},
    prepare: ({title, year, theme, media}) => ({
      title,
      subtitle: [year, theme].filter(Boolean).join(', '),
      media,
    }),
  },
})
