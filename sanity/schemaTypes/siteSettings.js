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
      description: 'The sections across the top of every page. The footer sitemap lists them too.',
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
      name: 'otherLinks',
      type: 'array',
      title: 'Other Resources',
      description: 'Listed after the main menu in the footer sitemap, like Accessibility.',
      fieldset: 'footer',
      of: [{type: 'link'}],
    }),
    defineField({
      name: 'socialLinks',
      type: 'array',
      title: 'Social Links',
      description: 'Under “Follow us”.',
      fieldset: 'footer',
      of: [{type: 'link'}],
    }),
    defineField({
      name: 'address',
      type: 'text',
      title: 'Address',
      description: 'Line breaks show as typed.',
      fieldset: 'footer',
      rows: 4,
    }),
    defineField({
      name: 'phone',
      type: 'string',
      title: 'Phone',
      fieldset: 'footer',
    }),
    defineField({
      name: 'email',
      type: 'email',
      title: 'Email',
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
