import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons/Document'
import {isLandingPage} from '../../landingPages'
import {modulesField, seoField, titleField} from '../fields'

const isHomepage = (document) => ['homepage', 'drafts.homepage'].includes(document?._id)
const isResearchLanding = (document) =>
  ['page-research', 'drafts.page-research'].includes(document?._id)

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
      name: 'intro',
      type: 'richText',
      title: 'Introduction',
      description: 'The large text at the top of the page.',
    }),
    defineField({
      name: 'links',
      type: 'array',
      title: 'Links',
      description: 'Buttons under the introduction, like “Visit Index”.',
      of: [{type: 'navLink'}],
      hidden: ({document}) => !isResearchLanding(document),
    }),
    modulesField({hidden: ({document}) => isResearchLanding(document)}),
    seoField(),
  ],
})
