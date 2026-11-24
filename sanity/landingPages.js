import {BookIcon} from '@sanity/icons/Book'
import {BulbOutlineIcon} from '@sanity/icons/BulbOutline'
import {CalendarIcon} from '@sanity/icons/Calendar'
import {CreditCardIcon} from '@sanity/icons/CreditCard'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {EarthGlobeIcon} from '@sanity/icons/EarthGlobe'
import {HomeIcon} from '@sanity/icons/Home'
import {ProjectsIcon} from '@sanity/icons/Projects'
import {UsersIcon} from '@sanity/icons/Users'

/**
 * Pages that always exist, each with a fixed ID: the homepage, and the
 * landing page above each kind of document (People above every person).
 * They list first under Pages and can't be deleted, and their slugs are
 * fixed because the documents' URLs sit under them (/people/jane-doe).
 * All Events is the events archive, at /events/all, and Research Index
 * everything under Research, at /research/all; Case Studies is at
 * /collaborations/case-studies. The People, Education and News IDs are the
 * ones the seeded menu already points at.
 */
export const landingPages = [
  {id: 'homepage', title: 'Home', icon: HomeIcon},
  {id: 'page-people', title: 'People Landing', icon: UsersIcon},
  {id: 'page-events', title: 'Events Landing', icon: CalendarIcon},
  {id: 'page-events-all', title: 'All Events', icon: CalendarIcon},
  {id: 'page-education', title: 'Education Landing', icon: BookIcon},
  {id: 'page-research', title: 'Research Landing', icon: ProjectsIcon},
  {id: 'page-research-all', title: 'Research Index', icon: ProjectsIcon},
  {id: 'page-collaborations', title: 'Collaborations Landing', icon: EarthGlobeIcon},
  {id: 'page-case-studies', title: 'Case Studies', icon: BulbOutlineIcon},
  {id: 'page-grants', title: 'Grants Landing', icon: CreditCardIcon},
  {id: 'page-news', title: 'News Landing', icon: DocumentTextIcon},
]

const landingIds = new Set(landingPages.flatMap(({id}) => [id, `drafts.${id}`]))

export const isLandingPage = (id) => landingIds.has(id)
