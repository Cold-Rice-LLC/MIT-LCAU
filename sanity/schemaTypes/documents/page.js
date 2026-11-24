import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons/Document'
import {isLandingPage} from '../../landingPages'
import {
  linksField,
  modulesField,
  noteField,
  onThisPageField,
  referencesField,
  seoField,
  subtitleField,
  titleField,
} from '../fields'

// Tests for whether a document is one of the pages with these IDs, or its draft
const isPage =
  (...ids) =>
  (document) =>
    ids.some((id) => [id, `drafts.${id}`].includes(document?._id))
const isHomepage = isPage('homepage')
const isPeopleLanding = isPage('page-people')
const isAllEvents = isPage('page-events-all')
const isNewsLanding = isPage('page-news')
const isResearchLanding = isPage('page-research')
const isResearchIndex = isPage('page-research-all')
// Pages that only list documents, with nothing but a headline above
const isListing = isPage(
  'page-people',
  'page-events',
  'page-events-all',
  'page-research-all',
  'page-news',
)

/**
 * Any page that isn't a person, event or other document: the homepage,
 * the landing pages (People, News…), and one-off pages like Mission.
 */
export default defineType({
  name: 'page',
  type: 'document',
  title: 'Page',
  icon: DocumentIcon,
  fields: [
    titleField(),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'The last part of the page’s URL.',
      options: {source: 'title'},
      hidden: ({document}) => isHomepage(document),
      readOnly: ({document}) => isLandingPage(document?._id),
      validation: (rule) =>
        rule.custom((value, context) =>
          isHomepage(context.document) || value?.current ? true : 'Required',
        ),
    }),
    defineField({
      name: 'heroSlides',
      type: 'array',
      title: 'Hero Slides',
      description:
        'The full-screen images at the top of the homepage, under the large logo. Each one’s caption shows along the bottom.',
      of: [{type: 'figure'}],
      options: {layout: 'grid'},
      hidden: ({document}) => !isHomepage(document),
    }),
    defineField({
      name: 'headline',
      type: 'string',
      title: 'Headline',
      description: 'The large heading at the top of the page, like “About LCAU”. Optional.',
      hidden: ({document}) => isHomepage(document),
    }),
    subtitleField({
      description: 'A line under the headline, like “Last updated on October 14, 2026”. Optional.',
      hidden: ({document}) => isLandingPage(document?._id) || !document?.headline,
    }),
    defineField({
      name: 'intro',
      type: 'richText',
      title: 'Introduction',
      description: 'The large text under the headline. Optional.',
      hidden: ({document}) => isHomepage(document) || isListing(document),
    }),
    noteField({
      description:
        'Purple text under the introduction, like “Explore all research, exhibitions and sponsored courses.”',
      hidden: ({document}) => !isResearchLanding(document),
    }),
    linksField({
      description: 'Buttons under the introduction and note, like “Visit Index”.',
      hidden: ({document}) => !isResearchLanding(document),
    }),
    referencesField('roleFilters', 'Role Filters', 'role', {
      description:
        'The Role buttons above everyone, in this order. Roles with no one yet are left out.',
      hidden: ({document}) => !isPeopleLanding(document),
    }),
    referencesField('typeFilters', 'Type Filters', 'eventType', {
      description:
        'The Type buttons above every event, in this order. Types with no events yet are left out. Leave empty for every type, A–Z.',
      hidden: ({document}) => !isAllEvents(document),
    }),
    referencesField('themeFilters', 'Theme Filters', 'researchTheme', {
      description:
        'The Theme filter’s choices, in this order. Themes with nothing yet are left out. Leave empty for every theme, A–Z.',
      hidden: ({document}) => !isResearchIndex(document),
    }),
    referencesField('fieldFilters', 'Field Filters', 'researchField', {
      description:
        'The Field filter’s choices, in this order. Fields with nothing yet are left out. Leave empty for every field, A–Z.',
      hidden: ({document}) => !isResearchIndex(document),
    }),
    referencesField('featuredNews', 'Featured News', 'news', {
      description: 'Up to three posts above All News, in this order. They list under All News too.',
      hidden: ({document}) => !isNewsLanding(document),
      validation: (rule) => rule.unique().max(3),
    }),
    onThisPageField({hidden: ({document}) => isLandingPage(document?._id)}),
    modulesField({
      hidden: ({document}) =>
        isHomepage(document) || isResearchLanding(document) || isListing(document),
    }),
    seoField(),
  ],
})
