import {TagIcon} from '@sanity/icons/Tag'
import {defineType} from 'sanity'
import {titleField} from './fields'

/**
 * A document that only exists to label others, like a role or an event
 * type: just a title, unless `options` says otherwise.
 */
export const labelType = (name, title, options = {}) =>
  defineType({
    name,
    type: 'document',
    title,
    icon: TagIcon,
    fields: [titleField()],
    orderings: [{title: 'Title', name: 'titleAsc', by: [{field: 'title', direction: 'asc'}]}],
    ...options,
  })
