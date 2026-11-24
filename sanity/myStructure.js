import {BookIcon} from '@sanity/icons/Book'
import {CalendarIcon} from '@sanity/icons/Calendar'
import {CogIcon} from '@sanity/icons/Cog'
import {DocumentIcon} from '@sanity/icons/Document'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {ProjectsIcon} from '@sanity/icons/Projects'
import {UserIcon} from '@sanity/icons/User'
import {landingPages} from './landingPages'

const typeItem = (S, [type, title]) => S.documentTypeListItem(type).title(title)

// Types that go together, like people and the roles that label them, under
// one item
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

      // In menu order
      typeGroup(S, 'peopleGroup', 'People', UserIcon, [
        ['person', 'All People'],
        ['role', 'Roles'],
      ]),
      typeGroup(S, 'eventsGroup', 'Events', CalendarIcon, [
        ['event', 'All Events'],
        ['eventType', 'Event Types'],
      ]),
      typeGroup(S, 'researchGroup', 'Research', ProjectsIcon, [
        ['research', 'All Research'],
        ['exhibition', 'Exhibitions'],
        ['researchTheme', 'Themes'],
        ['researchField', 'Fields'],
      ]),
      typeGroup(S, 'educationGroup', 'Education', BookIcon, [
        ['educationPage', 'Education Pages'],
        ['course', 'Courses'],
      ]),
      typeGroup(S, 'newsGroup', 'News', DocumentTextIcon, [
        ['news', 'All News'],
        ['newsType', 'News Types'],
      ]),
      typeItem(S, ['opportunity', 'Opportunities']),
      typeItem(S, ['caseStudy', 'Case Studies']),

      S.divider(),

      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
    ])
