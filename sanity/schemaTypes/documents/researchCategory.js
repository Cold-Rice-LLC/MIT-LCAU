import {TagsIcon} from '@sanity/icons/Tags'
import {defineType} from 'sanity'
import {titleField} from '../fields'

/** A kind of research, like Cities Initiative: beside the year on cards. */
export default defineType({
  name: 'researchCategory',
  type: 'document',
  title: 'Research Category',
  icon: TagsIcon,
  fields: [titleField()],
  orderings: [{title: 'Title', name: 'titleAsc', by: [{field: 'title', direction: 'asc'}]}],
})
