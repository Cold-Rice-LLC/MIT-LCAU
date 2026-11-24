import {ImagesIcon} from '@sanity/icons/Images'
import {defineField, defineType} from 'sanity'

/**
 * One image, or two side by side, uncropped, each with its caption. How
 * wide they are follows from their shapes.
 */
export default defineType({
  name: 'imagesModule',
  type: 'object',
  title: 'Images',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'images',
      type: 'array',
      title: 'Images',
      description: 'One, or two side by side. A landscape image shows wider than a portrait one.',
      of: [{type: 'figure'}],
      options: {layout: 'grid'},
      validation: (rule) => rule.required().min(1).max(2),
    }),
  ],
  preview: {
    select: {images: 'images'},
    prepare: ({images = []}) => ({
      title: images.find(({caption}) => caption)?.caption ?? 'Images',
      subtitle: images.length > 1 ? 'Two Images' : 'Image',
      media: images[0],
    }),
  },
})
