import {CaseIcon} from '@sanity/icons/Case'
import {defineField, defineType} from 'sanity'
import {excerptField, seoField, slugField, titleField} from '../fields'

/** A job or position, listed on the About page. */
export default defineType({
  name: 'opportunity',
  type: 'document',
  title: 'Opportunity',
  icon: CaseIcon,
  fieldsets: [{name: 'summary', title: 'At the Top', options: {columns: 2}}],
  fields: [
    titleField(),
    slugField(),
    defineField({
      name: 'open',
      type: 'boolean',
      title: 'Open',
      description: 'Listed on the About page while it’s open.',
      initialValue: true,
    }),
    excerptField({description: 'Shows in the list on the About page.'}),
    defineField({
      name: 'term',
      type: 'string',
      title: 'Term',
      description: 'Like “1-Year Appointment”.',
      fieldset: 'summary',
    }),
    defineField({
      name: 'salaryRange',
      type: 'string',
      title: 'Hiring Range',
      description: 'Like “$85,000 – $105,000”.',
      fieldset: 'summary',
    }),
    defineField({
      name: 'postedOn',
      type: 'date',
      title: 'Posted On',
      fieldset: 'summary',
      initialValue: () => new Date().toISOString().slice(0, 10),
    }),
    defineField({
      name: 'deadline',
      type: 'string',
      title: 'Deadline',
      description: 'Under “Apply”, like “Rolling applications until filled.”',
      fieldset: 'summary',
    }),
    defineField({
      name: 'applyUrl',
      type: 'url',
      title: 'Application URL',
      description: 'Where both Apply buttons go: at the top, and under How to Apply.',
      validation: (rule) => rule.uri({scheme: ['http', 'https', 'mailto']}),
    }),
    defineField({
      name: 'body',
      type: 'richText',
      title: 'Description',
      description: 'The left column: what the role is.',
    }),
    defineField({
      name: 'details',
      type: 'richText',
      title: 'Details',
      description:
        'The right column. Use headings for sections like “Applicants should submit:” or “Primary Responsibilities”.',
    }),
    defineField({
      name: 'howToApply',
      type: 'richText',
      title: 'How to Apply',
      description: 'Under Details, over the Apply button.',
    }),
    seoField(),
  ],
  orderings: [
    {title: 'Newest', name: 'postedOnDesc', by: [{field: 'postedOn', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title', term: 'term', open: 'open'},
    prepare: ({title, term, open}) => ({
      title,
      subtitle: [open === false && 'Closed', term].filter(Boolean).join(' · '),
    }),
  },
})
