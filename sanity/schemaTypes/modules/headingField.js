import {defineField} from 'sanity'

/** An optional H3 above a module, which also lists it under "On this page". */
export const headingField = (options = {}) =>
  defineField({
    name: 'heading',
    type: 'string',
    title: 'Heading',
    description: 'Also listed under “On this page”.',
    ...options,
  })
