import {BulbOutlineIcon} from '@sanity/icons/BulbOutline'
import {defineType} from 'sanity'
import {buttonsFields, radioField, referencesField} from '../fields'
import {headingField} from './headingField'

/**
 * Case studies three across, each linking to its section of the Case
 * Studies page: the latest three, or any picked by hand.
 */
export default defineType({
  name: 'caseStudiesModule',
  type: 'object',
  title: 'Case Studies',
  icon: BulbOutlineIcon,
  fields: [
    headingField({initialValue: 'Case Studies'}),
    radioField('source', 'Show', {'The latest three': 'latest', 'Picked by hand': 'picked'}),
    referencesField('documents', 'Case Studies', 'caseStudy', {
      hidden: ({parent}) => parent?.source !== 'picked',
    }),
    ...buttonsFields({
      note: 'Purple text under the case studies. Optional.',
      links: 'Under the case studies and note, like “View All Case Studies”.',
    }),
  ],
  preview: {
    select: {heading: 'heading', source: 'source'},
    prepare: ({heading, source}) => ({
      title: heading ?? 'Case Studies',
      subtitle: source === 'picked' ? 'Case Studies, picked by hand' : 'Case Studies, latest three',
    }),
  },
})
