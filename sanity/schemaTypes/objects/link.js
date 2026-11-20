import {defineField, defineType} from 'sanity'
import {linkableTypes} from '../fields'

/**
 * A labelled link to a page on the site or anywhere else. The site resolves
 * it with linkFields and linkHref (svelte/src/lib/sanity/links.js).
 */
export default defineType({
  name: 'link',
  type: 'object',
  title: 'Link',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      title: 'Label',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'linkType',
      type: 'string',
      title: 'Link Type',
      options: {
        list: [
          {title: 'Page on this site', value: 'internal'},
          {title: 'Other website', value: 'external'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'internal',
    }),
    defineField({
      name: 'internalLink',
      type: 'reference',
      title: 'Page',
      to: linkableTypes.map((type) => ({type})),
      hidden: ({parent}) => parent?.linkType !== 'internal',
    }),
    defineField({
      name: 'externalUrl',
      type: 'url',
      title: 'URL',
      description: 'Also takes mailto: and tel: links.',
      validation: (rule) => rule.uri({scheme: ['http', 'https', 'mailto', 'tel']}),
      hidden: ({parent}) => parent?.linkType !== 'external',
    }),
  ],
  preview: {
    select: {title: 'label', page: 'internalLink.title', url: 'externalUrl'},
    prepare: ({title, page, url}) => ({title, subtitle: page ?? url}),
  },
})
