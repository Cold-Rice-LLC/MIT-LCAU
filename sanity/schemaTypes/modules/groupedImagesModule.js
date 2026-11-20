import {ImagesIcon} from '@sanity/icons/Images'
import {defineField, defineType} from 'sanity'

/**
 * Two images side by side, a wide one and a narrow one (as a landscape
 * beside a portrait), each with its caption.
 */
export default defineType({
  name: 'groupedImagesModule',
  type: 'object',
  title: 'Grouped Images',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'images',
      type: 'array',
      title: 'Images',
      description: 'The first is the wide one.',
      of: [{type: 'figure'}],
      options: {layout: 'grid'},
      validation: (rule) => rule.required().length(2),
    }),
  ],
  preview: {
    select: {media: 'images.0', caption: 'images.0.caption'},
    prepare: ({media, caption}) => ({
      title: caption ?? 'Grouped Images',
      subtitle: 'Grouped Images',
      media,
    }),
  },
})
