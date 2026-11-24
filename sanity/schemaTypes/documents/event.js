import {CalendarIcon} from '@sanity/icons/Calendar'
import {defineField, defineType} from 'sanity'
import {imageField, modulesField, referencesField, seoField, slugField, titleField} from '../fields'

/** A lecture, conference or other event. It's upcoming or past by its dates. */
export default defineType({
  name: 'event',
  type: 'document',
  title: 'Event',
  icon: CalendarIcon,
  fieldsets: [{name: 'when', title: 'When and Where', options: {columns: 2}}],
  fields: [
    titleField(),
    slugField({
      // /events/all is the All Events page
      validation: (rule) =>
        rule.required().custom((slug) => (slug?.current === 'all' ? '“all” is taken' : true)),
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle',
      description: 'Like “Lecture Series — Sara Bronin”. Shows on the event page only.',
    }),
    defineField({
      name: 'type',
      type: 'reference',
      title: 'Type',
      description: 'Its tag, and the Type filter it’s under.',
      to: [{type: 'eventType'}],
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
      description: 'Where the RSVP button goes. Hidden once the event has ended.',
      fieldset: 'when',
      validation: (rule) => rule.uri({scheme: ['http', 'https', 'mailto']}),
    }),
    imageField({description: 'For cards. Cropped to 3:2 around the hotspot.'}),
    modulesField(),
    referencesField('relatedEvents', 'Related Events', 'event', {
      description: 'Leave empty to show the next upcoming events.',
    }),
    defineField({
      name: 'exhibition',
      type: 'reference',
      title: 'Related Exhibition',
      description: 'The exhibition this event is part of, like its opening. Optional.',
      to: [{type: 'exhibition'}],
      options: {disableNew: true},
    }),
    seoField(),
  ],
  orderings: [{title: 'Date', name: 'startDesc', by: [{field: 'start', direction: 'desc'}]}],
  preview: {
    select: {title: 'title', start: 'start', type: 'type.title', media: 'image'},
    prepare: ({title, start, type, media}) => ({
      title,
      subtitle: [type, start?.slice(0, 10)].filter(Boolean).join(', '),
      media,
    }),
  },
})
