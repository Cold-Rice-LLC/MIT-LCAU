import {defineField} from 'sanity'
import {buttonsFields, radioField, referencesField} from '../fields'

const isPicked = ({parent}) => parent?.source === 'picked'

/**
 * Which cards a set shows: the latest research, exhibitions or courses,
 * all or those with a theme or field, or any picked by hand; and the note
 * and buttons under them.
 */
export const cardsFields = [
  radioField('source', 'Show', {'The latest': 'latest', 'Picked by hand': 'picked'}),
  radioField(
    'kind',
    'Kind',
    {Research: 'research', Exhibitions: 'exhibition', Courses: 'course'},
    {hidden: isPicked},
  ),
  defineField({
    name: 'label',
    type: 'reference',
    title: 'Theme or Field',
    description: 'Only those with this theme or field. Leave empty for the latest of all.',
    to: [{type: 'researchTheme'}, {type: 'researchField'}],
    hidden: isPicked,
  }),
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
  ...buttonsFields({
    note: 'Purple text under the cards, like “Explore all Research on Index.”',
    links: 'Under the cards and note, like “Visit Index”.',
  }),
]
