import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {media} from 'sanity-plugin-media'
import {schemaTypes} from './schemaTypes'
import {isLandingPage} from './landingPages'
import {myStructure} from './myStructure'

// One fixed document each, opened from the structure: no create, delete or
// duplicate, and kept out of the "new document" menu
const singletonTypes = new Set(['siteSettings'])
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'default',
  title: 'MIT LCAU',

  projectId: 'ztsecwdy',
  dataset: 'production',

  plugins: [structureTool({structure: myStructure}), media(), visionTool()],

  schema: {
    types: schemaTypes,
    templates: (prev) => prev.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },

  document: {
    // Landing pages, like Site Settings, can be published but not deleted,
    // duplicated or unpublished
    actions: (input, {schemaType, documentId}) =>
      singletonTypes.has(schemaType) || isLandingPage(documentId)
        ? input.filter(({action}) => action && singletonActions.has(action))
        : input,
  },
})
