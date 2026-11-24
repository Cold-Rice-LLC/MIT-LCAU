import {PlayIcon} from '@sanity/icons/Play'
import {defineField, defineType} from 'sanity'
import {headingField} from './headingField'

/** A video the full width of the page, like a lecture's recording. */
export default defineType({
  name: 'videoModule',
  type: 'object',
  title: 'Video',
  icon: PlayIcon,
  fields: [
    headingField(),
    defineField({
      name: 'video',
      type: 'video',
      title: 'Video',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {heading: 'heading', caption: 'video.caption', media: 'video.poster'},
    prepare: ({heading, caption, media}) => ({
      title: heading ?? caption ?? 'Untitled',
      subtitle: 'Video',
      media,
    }),
  },
})
