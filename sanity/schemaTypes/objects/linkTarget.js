import {defineField} from 'sanity'
import {linkableTypes, shownWhere} from '../fields'

const linkTypeIs = (type) => (context) => context.parent?.linkType === type

/**
 * Where a link points, with no label of its own: a page on this site or
 * an external URL. Pass `required: true` for links that must point
 * somewhere; left optional, an untouched link renders as no link.
 * `files` adds an uploaded file, like a PDF. `schemes` widens the URL
 * schemes an external link accepts, as rich text links take mailto: and
 * tel:.
 */
export const linkTargetFields = ({required = false, schemes, files = false} = {}) => [
  defineField({
    name: 'linkType',
    type: 'string',
    title: 'Link Type',
    options: {
      list: [
        // A radio can't be un-picked, so an optional link needs an explicit
        // way back to no link once Internal or External has been clicked.
        // Required links must point somewhere, so they don't get the out.
        ...(required ? [] : [{title: 'None', value: 'none'}]),
        {title: 'Internal', value: 'internal'},
        {title: 'External', value: 'external'},
        ...(files ? [{title: 'File', value: 'file'}] : []),
      ],
      layout: 'radio',
      direction: 'horizontal',
    },
    initialValue: required ? 'internal' : undefined,
    validation: (rule) => (required ? rule.required() : rule),
  }),
  defineField({
    name: 'internalLink',
    type: 'reference',
    title: 'Page',
    description: 'The page on this site the link goes to.',
    to: linkableTypes.map((type) => ({type})),
    options: {disableNew: true},
    ...shownWhere(linkTypeIs('internal'), {required: 'Choose a page.'}),
  }),
  defineField({
    name: 'suffix',
    type: 'string',
    title: 'Section or Filter',
    description:
      'Added to the end of the page’s URL: a section, like #contact, or a filter, like ?type=courses. Optional.',
    hidden: (context) => !linkTypeIs('internal')(context),
    validation: (rule) =>
      rule
        .regex(/^[?#]\S+$/, {name: 'section or filter'})
        .error('Starts with # or ?, with no spaces.'),
  }),
  defineField({
    name: 'externalUrl',
    type: 'url',
    title: 'External URL',
    description: schemes
      ? 'A full URL, or a mailto:/tel: address. Opens in a new tab.'
      : 'A full URL. Opens in a new tab.',
    ...shownWhere(linkTypeIs('external'), {
      required: 'External URL is required.',
      rule: (rule) => (schemes ? rule.uri({scheme: schemes}) : rule),
    }),
  }),
  ...(files
    ? [
        defineField({
          name: 'file',
          type: 'file',
          title: 'File',
          description: 'Opens in a new tab.',
          ...shownWhere(linkTypeIs('file'), {required: 'Choose a file.'}),
        }),
      ]
    : []),
]

/** Rich text's link annotation: a required target, URLs including mailto:/tel:. */
export const linkAnnotation = {
  name: 'link',
  type: 'object',
  title: 'Link',
  fields: linkTargetFields({required: true, schemes: ['http', 'https', 'mailto', 'tel']}),
}

/** Shared preview select for a link destination. */
export const linkTargetSelect = {
  linkType: 'linkType',
  internalTitle: 'internalLink.title',
  internalName: 'internalLink.name',
  externalUrl: 'externalUrl',
  fileName: 'file.asset.originalFilename',
}

/** Shared preview subtitle for a link destination. */
export const linkTargetSubtitle = ({
  linkType,
  internalTitle,
  internalName,
  externalUrl,
  fileName,
}) => {
  if (linkType === 'external') return `↗ ${externalUrl || ''}`
  if (linkType === 'file') return fileName || 'File'
  return internalTitle || internalName || ''
}
