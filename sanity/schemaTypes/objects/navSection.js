import {defineField, defineType} from 'sanity'

/**
 * One top-level section of the main menu, like Events: its title, an
 * optional landing page, and the pages listed under it.
 */
export default defineType({
  name: 'navSection',
  type: 'object',
  title: 'Menu Section',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'landing',
      type: 'reference',
      title: 'Landing Page',
      description:
        'Where the title goes, as About goes to About LCAU. Leave empty to use the first link.',
      to: [{type: 'page'}],
    }),
    defineField({
      name: 'links',
      type: 'array',
      title: 'Links',
      of: [{type: 'link'}],
    }),
  ],
  preview: {
    select: {title: 'title', links: 'links'},
    prepare: ({title, links}) => ({
      title,
      subtitle: links?.map((link) => link.label).join(', '),
    }),
  },
})
