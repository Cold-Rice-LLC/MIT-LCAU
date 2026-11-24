import {defineArrayMember, defineType} from 'sanity'
import accordionModule from './accordionModule'
import columnsModule from './columnsModule'
import galleryModule from './galleryModule'
import groupedImagesModule from './groupedImagesModule'
import opportunitiesModule from './opportunitiesModule'
import peopleModule from './peopleModule'
import quoteModule from './quoteModule'
import textMediaModule from './textMediaModule'
import textModule from './textModule'
import videoModule from './videoModule'

/**
 * The flexible body of detail and landing pages, from the "all modules"
 * Research Detail frame in Figma. Each module with a heading also gets an
 * "On this page" link.
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
    'groupedImagesModule',
    'quoteModule',
    'accordionModule',
    'peopleModule',
    'opportunitiesModule',
    'columnsModule',
  ].map((type) => defineArrayMember({type})),
})

export const moduleTypes = [
  modules,
  accordionModule,
  columnsModule,
  galleryModule,
  groupedImagesModule,
  opportunitiesModule,
  peopleModule,
  quoteModule,
  textMediaModule,
  textModule,
  videoModule,
]
