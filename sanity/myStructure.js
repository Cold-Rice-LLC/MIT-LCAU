import {CogIcon} from '@sanity/icons/Cog'
import {DocumentIcon} from '@sanity/icons/Document'
import {landingPages} from './landingPages'

// The kinds of document listed on their own, in menu order
const documentTypes = [
  ['person', 'People'],
  ['role', 'Roles'],
  ['event', 'Events'],
  ['research', 'Research'],
  ['exhibition', 'Exhibitions'],
  ['course', 'Courses'],
  ['educationPage', 'Education'],
  ['news', 'News'],
  ['opportunity', 'Opportunities'],
  ['caseStudy', 'Case Studies'],
]

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

      ...documentTypes.map(([type, title]) => S.documentTypeListItem(type).title(title)),

      S.divider(),

      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
    ])
