import {BookIcon} from '@sanity/icons/Book'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {HomeIcon} from '@sanity/icons/Home'
import {ProjectsIcon} from '@sanity/icons/Projects'
import {UsersIcon} from '@sanity/icons/Users'

/**
 * Pages that always exist, each with a fixed ID: the homepage, and the
 * landing page above each kind of document (People above every person).
 * They list first under Pages and can't be deleted, and their slugs are
 * fixed because the documents' URLs sit under them (/people/jane-doe).
 * The People, Education and News IDs are the ones the seeded
 * menu already points at.
 */
export const landingPages = [
  {id: 'homepage', title: 'Home', icon: HomeIcon},
  {id: 'page-people', title: 'People Landing', icon: UsersIcon},
  {id: 'page-education', title: 'Education Landing', icon: BookIcon},
  {id: 'page-research', title: 'Research Landing', icon: ProjectsIcon},
  {id: 'page-news', title: 'News Landing', icon: DocumentTextIcon},
]

const landingIds = new Set(landingPages.flatMap(({id}) => [id, `drafts.${id}`]))

export const isLandingPage = (id) => landingIds.has(id)
