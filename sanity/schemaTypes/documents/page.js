import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons/Document'
import {isLandingPage} from '../../landingPages'
import {
  buttonsFields,
  feedTypes,
  modulesField,
  onThisPageField,
  referencesField,
  seoField,
  subtitleField,
  titleField,
} from '../fields'

// Tests, as for a field's `hidden`, for whether its document is one of the
// pages with these IDs, or its draft
const isPage =
  (...ids) =>
  ({document}) =>
    ids.some((id) => [id, `drafts.${id}`].includes(document?._id))
const isHomepage = isPage('homepage')
const isPeopleLanding = isPage('page-people')
const isAllEvents = isPage('page-events-all')
const isNewsLanding = isPage('page-news')
const isResearchLanding = isPage('page-research')
const isResearchIndex = isPage('page-research-all')
// The homepage, and pages that only list documents, with nothing but a headline above
const hasNoIntro = isPage(
  'homepage',
  'page-people',
  'page-events',
  'page-events-all',
  'page-research-all',
  'page-news',
)
// Those, and the Research landing, whose sections are what it lists
const hasNoModules = (context) => hasNoIntro(context) || isResearchLanding(context)

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
      hidden: isHomepage,
      readOnly: ({document}) => isLandingPage(document?._id),
      validation: (rule) =>
        rule.custom((value, context) => {
          if (isHomepage(context)) return true
          if (!value?.current) return 'Required'
          // /search is the site's search
          return value.current === 'search' ? '“search” is taken' : true
        }),
    }),
    defineField({
      name: 'heroSlides',
      type: 'array',
      title: 'Hero Slides',
      description:
        'The full-screen images at the top of the homepage, under the large logo. Each one’s caption shows along the bottom.',
      of: [{type: 'figure'}],
      options: {layout: 'grid'},
      hidden: (context) => !isHomepage(context),
    }),
    referencesField('featured', 'Featured', feedTypes, {
      description:
        'First in the cards under the hero, in this order. The latest events, news, research, exhibitions and courses follow, up to 24 cards in all.',
      hidden: (context) => !isHomepage(context),
    }),
    defineField({
      name: 'headline',
      type: 'string',
      title: 'Headline',
      description: 'The large heading at the top of the page, like “About LCAU”. Optional.',
      hidden: isHomepage,
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
      hidden: hasNoIntro,
    }),
    ...buttonsFields({
      note: 'Purple text under the introduction, like “Explore all research, exhibitions and sponsored courses.”',
      links: 'Under the introduction and note, like “Visit Index”.',
      hidden: hasNoIntro,
    }),
    referencesField('roleFilters', 'Role Filters', 'role', {
      description:
        'The Role buttons above everyone, in this order. Roles with no one yet are left out.',
      hidden: (context) => !isPeopleLanding(context),
    }),
    referencesField('typeFilters', 'Type Filters', 'eventType', {
      description:
        'The Type buttons above every event, in this order. Types with no events yet are left out. Leave empty for every type, A–Z.',
      hidden: (context) => !isAllEvents(context),
    }),
    referencesField('themeFilters', 'Theme Filters', 'researchTheme', {
      description:
        'The Theme filter’s choices, in this order. Themes with nothing yet are left out. Leave empty for every theme, A–Z.',
      hidden: (context) => !isResearchIndex(context),
    }),
    referencesField('fieldFilters', 'Field Filters', 'researchField', {
      description:
        'The Field filter’s choices, in this order. Fields with nothing yet are left out. Leave empty for every field, A–Z.',
      hidden: (context) => !isResearchIndex(context),
    }),
    referencesField('featuredNews', 'Featured News', 'news', {
      description: 'Up to three posts above All News, in this order. They list under All News too.',
      hidden: (context) => !isNewsLanding(context),
      validation: (rule) => rule.unique().max(3),
    }),
    onThisPageField({hidden: hasNoModules}),
    defineField({
      name: 'introLabel',
      type: 'string',
      title: 'Introduction’s “On this page” Label',
      description:
        'What the introduction is called there, like “Introduction”. Leave empty to leave it out.',
      hidden: ({document}) => !document?.onThisPage || !document?.intro?.length,
    }),
    modulesField({hidden: hasNoModules}),
    seoField(),
  ],
})
