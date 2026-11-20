import {CaseIcon} from '@sanity/icons/Case'
import {defineField, defineType} from 'sanity'
import {excerptField, seoField, slugField, titleField} from '../fields'

/** A job or position, listed on the About page. */
export default defineType({
  name: 'opportunity',
  type: 'document',
  title: 'Opportunity',
  icon: CaseIcon,
  fieldsets: [{name: 'details', title: 'Details', options: {columns: 2}}],
  fields: [
    titleField(),
    slugField(),
    excerptField({description: 'Shows in the list on the About page.'}),
    defineField({
      name: 'term',
      type: 'string',
      title: 'Term',
      description: 'Like “1-Year Appointment”.',
      fieldset: 'details',
    }),
    defineField({
      name: 'salaryRange',
      type: 'string',
      title: 'Hiring Range',
      description: 'Like “$85,000 – $105,000”.',
      fieldset: 'details',
    }),
    defineField({
      name: 'postedOn',
      type: 'date',
      title: 'Posted On',
      fieldset: 'details',
      initialValue: () => new Date().toISOString().slice(0, 10),
    }),
    defineField({
      name: 'deadline',
      type: 'string',
      title: 'Deadline',
      description: 'Like “Rolling applications until filled.”',
      fieldset: 'details',
    }),
    defineField({
      name: 'applyUrl',
      type: 'url',
      title: 'Application URL',
      description: 'Where “Apply” goes.',
      validation: (rule) => rule.uri({scheme: ['http', 'https', 'mailto']}),
    }),
    defineField({
      name: 'body',
      type: 'richText',
      title: 'Description',
      description: 'Use headings for sections like “Primary Responsibilities”.',
    }),
    seoField(),
  ],
  orderings: [
    {title: 'Newest', name: 'postedOnDesc', by: [{field: 'postedOn', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title', subtitle: 'term'},
  },
})
