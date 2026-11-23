import {ImagesIcon} from '@sanity/icons/Images'
import {defineField, defineType} from 'sanity'
import {radioField} from '../fields'
import {headingField} from './headingField'

/**
 * A set of images, as a carousel ("1 of 5") or a grid that opens each
 * image full-screen.
 */
export default defineType({
  name: 'galleryModule',
  type: 'object',
  title: 'Gallery',
  icon: ImagesIcon,
  fields: [
    headingField(),
    radioField('display', 'Display', {Carousel: 'carousel', Grid: 'grid'}),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [{type: 'figure'}],
      options: {layout: 'grid'},
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {heading: 'heading', display: 'display', images: 'images'},
    prepare: ({heading, display, images = []}) => ({
      title: heading ?? 'Gallery',
      subtitle: `${display === 'grid' ? 'Grid' : 'Carousel'}, ${images.length} images`,
      media: images[0],
    }),
  },
})
