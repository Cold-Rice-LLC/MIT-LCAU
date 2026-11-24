import {defineField} from 'sanity'

/** An optional heading above a module. */
export const headingField = (options = {}) =>
  defineField({
    name: 'heading',
    type: 'string',
    title: 'Heading',
    ...options,
  })
