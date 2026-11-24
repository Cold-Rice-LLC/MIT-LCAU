import {ThLargeIcon} from '@sanity/icons/ThLarge'
import {defineField, defineType} from 'sanity'
import {linksField, noteField, radioField, referencesField} from '../fields'
import {headingField} from './headingField'

const isPicked = ({parent}) => parent?.source === 'picked'

/**
 * Cards for research, exhibitions or courses, like a course's Related
 * Research: the latest of one kind, or any picked by hand.
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
    radioField('source', 'Show', {'The latest': 'latest', 'Picked by hand': 'picked'}),
    radioField(
      'kind',
      'Kind',
      {Research: 'research', Exhibitions: 'exhibition', Courses: 'course'},
      {hidden: isPicked},
    ),
    defineField({
      name: 'count',
      type: 'number',
      title: 'How Many',
      description: 'Four to a row.',
      initialValue: 4,
      hidden: isPicked,
      validation: (rule) => rule.integer().min(1).max(12),
    }),
    referencesField('documents', 'Cards', ['research', 'exhibition', 'course'], {
      hidden: (context) => !isPicked(context),
    }),
    noteField({
      description: 'Purple text under the cards, like “Explore all Research on Index.”',
    }),
    linksField({
      title: 'Buttons',
      description: 'Under the cards and note, like “Visit Index”.',
    }),
  ],
  preview: {
    select: {heading: 'heading', source: 'source', kind: 'kind'},
    prepare: ({heading, source, kind}) => ({
      title: heading ?? 'Cards',
      subtitle: source === 'picked' ? 'Cards, picked by hand' : `Cards, latest: ${kind}`,
    }),
  },
})
