import {ImageIcon} from '@sanity/icons/Image'
import {defineField, defineType} from 'sanity'
import {headingField} from './headingField'

/**
 * Text with images or a video, either side by side or with the media
 * above the text.
 */
export default defineType({
  name: 'textMediaModule',
  type: 'object',
  title: 'Text and Media',
  icon: ImageIcon,
  fields: [
    headingField(),
    defineField({
      name: 'text',
      type: 'richText',
      title: 'Text',
    }),
    defineField({
      name: 'mediaType',
      type: 'string',
      title: 'Media',
      options: {
        list: [
          {title: 'Images', value: 'images'},
          {title: 'Video', value: 'video'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'images',
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Images',
      description: 'One or two.',
      of: [{type: 'figure'}],
      validation: (rule) => rule.max(2),
      hidden: ({parent}) => parent?.mediaType === 'video',
    }),
    defineField({
      name: 'video',
      type: 'video',
      title: 'Video',
      hidden: ({parent}) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'layout',
      type: 'string',
      title: 'Layout',
      description: 'Two images or a video always go above the text.',
      options: {
        list: [
          {title: 'Media beside text', value: 'beside'},
          {title: 'Media above text', value: 'above'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'beside',
    }),
  ],
  preview: {
    select: {heading: 'heading', media: 'images.0', mediaType: 'mediaType'},
    prepare: ({heading, media, mediaType}) => ({
      title: heading ?? 'Untitled',
      subtitle: mediaType === 'video' ? 'Text and Video' : 'Text and Images',
      media,
    }),
  },
})
