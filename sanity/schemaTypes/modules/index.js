import {defineArrayMember, defineType} from 'sanity'
import accordionModule from './accordionModule'
import columnsModule from './columnsModule'
import galleryModule from './galleryModule'
import imagesModule from './imagesModule'
import {onThisPageFields} from './onThisPageFields'
import opportunitiesModule from './opportunitiesModule'
import peopleModule from './peopleModule'
import quoteModule from './quoteModule'
import textMediaModule from './textMediaModule'
import textModule from './textModule'
import videoModule from './videoModule'

/**
 * The flexible body of detail and landing pages, from the "all modules"
 * Research Detail frame in Figma. On pages with "On this page", each
 * module with a heading or a label of its own gets a link there.
 */
const modules = defineType({
  name: 'modules',
  type: 'array',
  title: 'Content',
  of: [
    'textModule',
    'textMediaModule',
    'videoModule',
    'galleryModule',
    'imagesModule',
    'quoteModule',
    'accordionModule',
    'peopleModule',
    'opportunitiesModule',
    'columnsModule',
  ].map((type) => defineArrayMember({type})),
})

const withOnThisPage = (module) => ({
  ...module,
  fields: [...module.fields, ...onThisPageFields],
})

export const moduleTypes = [
  modules,
  ...[
    accordionModule,
    columnsModule,
    galleryModule,
    imagesModule,
    opportunitiesModule,
    peopleModule,
    quoteModule,
    textMediaModule,
    textModule,
    videoModule,
  ].map(withOnThisPage),
]
