import {defineArrayMember, defineType} from 'sanity'
import accordionModule from './accordionModule'
import galleryModule from './galleryModule'
import groupedImagesModule from './groupedImagesModule'
import peopleModule from './peopleModule'
import quoteModule from './quoteModule'
import textMediaModule from './textMediaModule'
import textModule from './textModule'

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
    'galleryModule',
    'groupedImagesModule',
    'quoteModule',
    'accordionModule',
    'peopleModule',
  ].map((type) => defineArrayMember({type})),
})

export const moduleTypes = [
  modules,
  accordionModule,
  galleryModule,
  groupedImagesModule,
  peopleModule,
  quoteModule,
  textMediaModule,
  textModule,
]
