import {defineArrayMember, defineType} from 'sanity'
import accordionModule from './accordionModule'
import cardsModule from './cardsModule'
import caseStudiesModule from './caseStudiesModule'
import columnsModule from './columnsModule'
import detailsModule from './detailsModule'
import galleryModule from './galleryModule'
import imagesModule from './imagesModule'
import namesModule from './namesModule'
import {onThisPageFields} from './onThisPageFields'
import openCallsModule from './openCallsModule'
import opportunitiesModule from './opportunitiesModule'
import peopleModule from './peopleModule'
import quoteModule from './quoteModule'
import textMediaModule from './textMediaModule'
import textModule from './textModule'
import videoModule from './videoModule'

// In the order the Studio lists them to insert
const members = [
  textModule,
  textMediaModule,
  videoModule,
  galleryModule,
  imagesModule,
  quoteModule,
  detailsModule,
  cardsModule,
  caseStudiesModule,
  accordionModule,
  peopleModule,
  namesModule,
  opportunitiesModule,
  openCallsModule,
  columnsModule,
]

/**
 * The flexible body of detail and landing pages, from the "all modules"
 * Research Detail frame in Figma. On pages with "On this page", each
 * module with a heading or a label of its own gets a link there.
 */
const modules = defineType({
  name: 'modules',
  type: 'array',
  title: 'Content',
  of: members.map(({name}) => defineArrayMember({type: name})),
})

const withOnThisPage = (module) => ({
  ...module,
  fields: [...module.fields, ...onThisPageFields],
})

export const moduleTypes = [modules, ...members.map(withOnThisPage)]
