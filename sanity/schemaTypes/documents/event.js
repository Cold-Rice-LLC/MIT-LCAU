import {CalendarIcon} from '@sanity/icons/Calendar'
import {defineField, defineType} from 'sanity'
import {imageField, modulesField, referencesField, seoField, slugField, titleField} from '../fields'

// The All Events Type filter, and the tag on each event's card
export const eventTypes = [
  {title: 'Conference', value: 'conference'},
  {title: 'Lecture', value: 'lecture'},
  {title: 'Workshop', value: 'workshop'},
  {title: 'Open House', value: 'openHouse'},
  {title: 'Other', value: 'other'},
]

/** A lecture, conference or other event. It's upcoming or past by its dates. */
export default defineType({
  name: 'event',
  type: 'document',
  title: 'Event',
  icon: CalendarIcon,
  fieldsets: [{name: 'when', title: 'When and Where', options: {columns: 2}}],
  fields: [
    titleField(),
    slugField(),
    defineField({
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle',
      description: 'Like “Lecture Series — Sara Bronin”. Shows on the event page only.',
    }),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Type',
      options: {list: eventTypes},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'start',
      type: 'datetime',
      title: 'Starts',
      fieldset: 'when',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'end',
      type: 'datetime',
      title: 'Ends',
      fieldset: 'when',
      validation: (rule) =>
        rule.custom((end, {document}) =>
          !end || !document?.start || end >= document.start ? true : 'Ends before it starts',
        ),
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Location',
      fieldset: 'when',
    }),
    defineField({
      name: 'attendance',
      type: 'string',
      title: 'Attendance',
      description: 'Like “Free, RSVP Required”. Past events say “This event has ended.” instead.',
      fieldset: 'when',
    }),
    defineField({
      name: 'rsvpUrl',
      type: 'url',
      title: 'RSVP URL',
      fieldset: 'when',
      validation: (rule) => rule.uri({scheme: ['http', 'https', 'mailto']}),
    }),
    imageField(),
    modulesField(),
    referencesField('relatedEvents', 'Related Events', 'event', {
      description: 'Leave empty to show the next upcoming events.',
    }),
    seoField(),
  ],
  orderings: [{title: 'Date', name: 'startDesc', by: [{field: 'start', direction: 'desc'}]}],
  preview: {
    select: {title: 'title', start: 'start', type: 'type', media: 'image'},
    prepare: ({title, start, type, media}) => ({
      title,
      subtitle: [eventTypes.find(({value}) => value === type)?.title, start?.slice(0, 10)]
        .filter(Boolean)
        .join(', '),
      media,
    }),
  },
})
