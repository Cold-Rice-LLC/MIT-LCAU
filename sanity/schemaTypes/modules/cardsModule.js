import {ThLargeIcon} from '@sanity/icons/ThLarge'
import {defineField, defineType} from 'sanity'
import {cardsFields} from './cardsFields'
import {headingField} from './headingField'

/**
 * Cards for research, exhibitions or courses, like a course's Related
 * Research: the latest of one kind, or any picked by hand (see cardsFields).
 */
export default defineType({
  name: 'cardsModule',
  type: 'object',
  title: 'Cards',
  icon: ThLargeIcon,
  fields: [
    headingField(),
    defineField({
      name: 'text',
      type: 'richText',
      title: 'Text',
      description: 'Above the cards. Optional.',
    }),
    ...cardsFields,
  ],
  preview: {
    select: {heading: 'heading', source: 'source', kind: 'kind'},
    prepare: ({heading, source, kind}) => ({
      title: heading ?? 'Cards',
      subtitle: source === 'picked' ? 'Cards, picked by hand' : `Cards, latest: ${kind}`,
    }),
  },
})
