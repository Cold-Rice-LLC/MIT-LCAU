import {defineField, defineType} from 'sanity'

/** An image with the alt text and caption every image on the site carries. */
export default defineType({
  name: 'figure',
  type: 'image',
  title: 'Image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alt Text',
      description: 'What the image shows, for screen readers. Leave empty if it’s decorative.',
    }),
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Caption',
    }),
  ],
})
