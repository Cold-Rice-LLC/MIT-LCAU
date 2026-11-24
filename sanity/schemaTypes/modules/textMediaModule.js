import {ImageIcon} from '@sanity/icons/Image'
import {defineField, defineType} from 'sanity'
import {buttonsFields, radioField} from '../fields'
import {cardsFields} from './cardsFields'
import {headingField} from './headingField'

// Whether the media goes above the text, or it's a video, which always does
const isNotBeside = ({parent}) => parent?.layout === 'above' || parent?.mediaType === 'video'

/**
 * Text with images or a video, either side by side or with the media
 * above the text, and any cards underneath, like a grant's Related
 * Research.
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
    ...buttonsFields({
      note: 'Purple text under the text, like “This event is free and open to MIT students.”',
      links: 'Under the text and note, like “RSVP”.',
    }),
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
        hidden: isNotBeside,
      },
    ),
    radioField(
      'imageShape',
      'Image Shape',
      {'Cropped to 3:2': 'cropped', Original: 'original'},
      {description: 'For an image beside the text.', hidden: isNotBeside},
    ),
    defineField({
      name: 'showCards',
      type: 'boolean',
      title: 'Show Cards Underneath',
      description: 'Research, exhibitions or courses that go with this, like Related Research.',
      initialValue: false,
    }),
    defineField({
      name: 'cards',
      type: 'object',
      title: 'Cards',
      fields: [
        headingField({
          description: 'Smaller than the section’s own, like “Related Research”.',
          initialValue: 'Related Research',
        }),
        ...cardsFields,
      ],
      hidden: ({parent}) => !parent?.showCards,
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
