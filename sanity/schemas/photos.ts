import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'photo',
  title: 'Photo',
  type: 'document',
  fields: [
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorLink',
      title: 'AuthorLink',
      type: 'url'
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'throwOffAnswer',
      title: 'ThrowOffAnswer',
      type: 'string',
    }),
    defineField({
      name: 'img',
      title: 'Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),
  ]
})
