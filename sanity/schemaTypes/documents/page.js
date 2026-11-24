import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons/Document'
import {isLandingPage} from '../../landingPages'
import {modulesField, referencesField, seoField, titleField} from '../fields'

// Tests for whether a document is one of the pages with these IDs, or its draft
const isPage =
  (...ids) =>
  (document) =>
    ids.some((id) => [id, `drafts.${id}`].includes(document?._id))
const isHomepage = isPage('homepage')
const isPeopleLanding = isPage('page-people')
const isResearchLanding = isPage('page-research')
// Pages that only list documents, with nothing but a headline above
const isListing = isPage('page-people', 'page-events', 'page-events-all')

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
    defineField({
      name: 'intro',
      type: 'richText',
      title: 'Introduction',
      description: 'The large text under the headline. Optional.',
      hidden: ({document}) => isHomepage(document) || isListing(document),
    }),
    defineField({
      name: 'links',
      type: 'array',
      title: 'Links',
      description: 'Buttons under the introduction, like “Visit Index”.',
      of: [{type: 'navLink'}],
      hidden: ({document}) => !isResearchLanding(document),
    }),
    referencesField('roleFilters', 'Role Filters', 'role', {
      description:
        'The Role buttons above everyone, in this order. Roles with no one yet are left out.',
      hidden: ({document}) => !isPeopleLanding(document),
    }),
    modulesField({
      hidden: ({document}) =>
        isHomepage(document) || isResearchLanding(document) || isListing(document),
    }),
    seoField(),
  ],
})
