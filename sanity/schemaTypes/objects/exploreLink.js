import {defineField, defineType} from 'sanity'

/**
 * One of the large links above the footer, like "Our Events". On desktop,
 * hovering it shows the description and image.
 */
export default defineType({
  name: 'exploreLink',
  type: 'object',
  title: 'Explore Link',
  fields: [
    defineField({
      name: 'link',
      type: 'navLink',
      title: 'Link',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 3,
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      description: 'Cropped to 3:2 around the hotspot.',
      options: {hotspot: true},
    }),
  ],
  preview: {
    select: {title: 'link.label', subtitle: 'description', media: 'image'},
  },
})
