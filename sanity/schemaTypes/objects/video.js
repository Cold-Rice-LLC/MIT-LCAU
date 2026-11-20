import {defineField, defineType} from 'sanity'

/** A YouTube or Vimeo video, with an optional poster image and caption. */
export default defineType({
  name: 'video',
  type: 'object',
  title: 'Video',
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'URL',
      description: 'The video’s YouTube or Vimeo page.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'poster',
      type: 'image',
      title: 'Poster Image',
      description: 'Shows before the video plays. Leave empty to use the video’s own.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Caption',
    }),
  ],
  preview: {
    select: {title: 'caption', subtitle: 'url', media: 'poster'},
  },
})
