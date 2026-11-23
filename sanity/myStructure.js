import {CogIcon} from '@sanity/icons/Cog'
import {DocumentIcon} from '@sanity/icons/Document'
import {ProjectsIcon} from '@sanity/icons/Projects'
import {UserIcon} from '@sanity/icons/User'
import {landingPages} from './landingPages'

// The kinds of document listed on their own, after People, Events and
// Research, in menu order
const documentTypes = [
  ['exhibition', 'Exhibitions'],
  ['course', 'Courses'],
  ['educationPage', 'Education'],
  ['news', 'News'],
  ['opportunity', 'Opportunities'],
  ['caseStudy', 'Case Studies'],
]

const typeItem = (S, [type, title]) => S.documentTypeListItem(type).title(title)

// A type and the one that only exists to label it, like people and their
// roles, together under one item
const typeGroup = (S, id, title, icon, types) =>
  S.listItem()
    .id(id)
    .title(title)
    .icon(icon)
    .child(
      S.list()
        .title(title)
        .items(types.map((type) => typeItem(S, type))),
    )

const landingFilter = landingPages.flatMap(({id}) => [`"${id}"`, `"drafts.${id}"`]).join(', ')

export const myStructure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Pages')
        .icon(DocumentIcon)
        .child(
          S.list()
            .title('Pages')
            .items([
              ...landingPages.map(({id, title, icon}) =>
                S.listItem()
                  .id(id)
                  .title(title)
                  .icon(icon)
                  .child(S.document().schemaType('page').documentId(id).title(title)),
              ),
              S.divider(),
              S.documentTypeListItem('page')
                .title('All other pages')
                .child(
                  S.documentTypeList('page')
                    .title('All other pages')
                    .filter(`_type == "page" && !(_id in [${landingFilter}])`),
                ),
            ]),
        ),

      S.divider(),

      typeGroup(S, 'peopleGroup', 'People', UserIcon, [
        ['person', 'All People'],
        ['role', 'Roles'],
      ]),
      typeItem(S, ['event', 'Events']),
      typeGroup(S, 'researchGroup', 'Research', ProjectsIcon, [
        ['research', 'All Research'],
        ['researchCategory', 'Categories'],
      ]),
      ...documentTypes.map((type) => typeItem(S, type)),

      S.divider(),

      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
    ])
