import {ImageIcon} from '@sanity/icons/Image'
import {defineField, defineType} from 'sanity'
import {linksField, noteField, radioField} from '../fields'
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
    noteField({
      description:
        'Purple text under the text, like “This event is free and open to MIT students.”',
    }),
    linksField({title: 'Buttons', description: 'Under the text and note, like “RSVP”.'}),
    radioField('mediaType', 'Media', {Images: 'images', Video: 'video'}),
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
    radioField(
      'layout',
      'Layout',
      {'Media beside text': 'beside', 'Media above text': 'above'},
      {description: 'Two images or a video always go above the text.'},
    ),
    radioField(
      'side',
      'Media Side',
      {Left: 'left', Right: 'right'},
      {
        description: 'Which side of the text an image beside it is on.',
        hidden: ({parent}) => parent?.layout === 'above' || parent?.mediaType === 'video',
      },
    ),
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
