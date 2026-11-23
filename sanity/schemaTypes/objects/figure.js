import {defineField, defineType} from 'sanity'

/**
 * An image with a caption. Its alt text is the media library's, set once
 * per asset, so there's no field for it here.
 */
export default defineType({
  name: 'figure',
  type: 'image',
  title: 'Image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Caption',
    }),
  ],
})
