import {defineField} from 'sanity'

// Only where the page shows the list
const hidden = ({document}) => !document?.onThisPage

/** How a module lists under "On this page", on pages that show it. */
export const onThisPageFields = [
  defineField({
    name: 'onThisPageLabel',
    type: 'string',
    title: '“On this page” Label',
    description:
      'What this section is called under “On this page”. Leave empty to use its heading; with neither, it isn’t listed.',
    hidden,
  }),
  defineField({
    name: 'hideOnThisPage',
    type: 'boolean',
    title: 'Hide from “On this page”',
    initialValue: false,
    hidden,
  }),
]
