import siteSettings from './siteSettings'
import caseStudy from './documents/caseStudy'
import course from './documents/course'
import educationPage from './documents/educationPage'
import event from './documents/event'
import exhibition from './documents/exhibition'
import news from './documents/news'
import opportunity from './documents/opportunity'
import page from './documents/page'
import person from './documents/person'
import research from './documents/research'
import researchCategory from './documents/researchCategory'
import role from './documents/role'
import {moduleTypes} from './modules'
import exploreLink from './objects/exploreLink'
import figure from './objects/figure'
import navLink from './objects/navLink'
import navSection from './objects/navSection'
import plainText from './objects/plainText'
import richText from './objects/richText'
import seo from './objects/seo'
import video from './objects/video'

export const schemaTypes = [
  // Documents
  siteSettings,
  page,
  person,
  role,
  event,
  research,
  researchCategory,
  exhibition,
  course,
  educationPage,
  news,
  opportunity,
  caseStudy,
  // Objects
  exploreLink,
  figure,
  navLink,
  navSection,
  plainText,
  richText,
  seo,
  video,
  // Modules
  ...moduleTypes,
]
