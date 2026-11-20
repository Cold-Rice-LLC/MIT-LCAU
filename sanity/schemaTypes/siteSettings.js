import {CogIcon} from '@sanity/icons/Cog'
import {defineField, defineType} from 'sanity'

/**
 * Site-wide content. The SEO fields are what every page falls back to when
 * it leaves its own SEO empty.
 */
export default defineType({
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  icon: CogIcon,
  fieldsets: [
    {
      name: 'seo',
      title: 'SEO',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'footer',
      title: 'Footer',
      options: {collapsible: true, collapsed: false},
    },
  ],
  fields: [
    defineField({
      name: 'navigation',
      type: 'array',
      title: 'Main Menu',
      description: 'The sections across the top of every page.',
      of: [{type: 'navSection'}],
    }),
    defineField({
      name: 'explore',
      type: 'array',
      title: 'Explore Links',
      description: 'The large links above the footer on every page.',
      of: [{type: 'exploreLink'}],
    }),
    defineField({
      name: 'section1NewsletterHeading',
      type: 'string',
      title: 'Section #1 Newsletter Heading',
      description: 'Above the email signup, beside the logo.',
      fieldset: 'footer',
      initialValue: 'Join our Newsletter',
    }),
    defineField({
      name: 'section1LinksHeading',
      type: 'string',
      title: 'Section #1 Links Heading',
      description: 'Above the links under the email signup, like “Follow us”.',
      fieldset: 'footer',
      initialValue: 'Follow us',
    }),
    defineField({
      name: 'section1Links',
      type: 'array',
      title: 'Section #1 Links',
      description: 'Under the email signup, like social media accounts.',
      fieldset: 'footer',
      of: [{type: 'navLink'}],
    }),
    defineField({
      name: 'section2Heading',
      type: 'string',
      title: 'Section #2 Heading',
      fieldset: 'footer',
      initialValue: 'Sitemap',
    }),
    defineField({
      name: 'section2LinksColumn1',
      type: 'plainText',
      title: 'Section #2 Links Column #1',
      description:
        'The left column under the Section #2 heading. Each line shows on its own; leave a line empty for a gap.',
      fieldset: 'footer',
    }),
    defineField({
      name: 'section2LinksColumn2',
      type: 'plainText',
      title: 'Section #2 Links Column #2',
      description: 'The right column under the Section #2 heading.',
      fieldset: 'footer',
    }),
    defineField({
      name: 'section3Heading',
      type: 'string',
      title: 'Section #3 Heading',
      description: 'Desktop only, as in the design.',
      fieldset: 'footer',
      initialValue: 'Contact',
    }),
    defineField({
      name: 'section3Text',
      type: 'plainText',
      title: 'Section #3 Text',
      description: 'Under the MIT logo, like the address, phone number and email.',
      fieldset: 'footer',
    }),
    defineField({
      name: 'siteTitle',
      type: 'string',
      title: 'Site Title',
      description: 'Follows every page’s title, as in “About — Site Title”.',
      fieldset: 'seo',
    }),
    defineField({
      name: 'metaDescription',
      type: 'text',
      title: 'Meta Description',
      description: 'For pages without a description of their own.',
      fieldset: 'seo',
      rows: 3,
      validation: (rule) =>
        rule.max(160).warning('Search results cut descriptions off at about 160 characters.'),
    }),
    defineField({
      name: 'ogImage',
      type: 'image',
      title: 'Share Image',
      description:
        'For pages without a share image of their own. Cropped to 1200 × 630 around the hotspot.',
      fieldset: 'seo',
      options: {hotspot: true},
    }),
  ],
  preview: {
    prepare: () => ({title: 'Site Settings'}),
  },
})
