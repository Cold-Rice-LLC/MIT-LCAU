import {defineArrayMember, defineField, defineType} from 'sanity'
import {linkableTypes} from '../fields'

/**
 * Formatted text: paragraphs, H3 subheadings, lists, and links to pages
 * on the site or anywhere else.
 */
export default defineType({
  name: 'richText',
  type: 'array',
  title: 'Text',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Heading', value: 'h3'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Bold', value: 'strong'},
          {title: 'Italic', value: 'em'},
        ],
        annotations: [
          defineArrayMember({
            name: 'textLink',
            type: 'object',
            title: 'Link',
            fields: [
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
                initialValue: 'external',
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
          }),
        ],
      },
    }),
  ],
})
