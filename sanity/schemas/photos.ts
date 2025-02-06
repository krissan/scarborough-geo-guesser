import { defineField, defineType } from 'sanity'

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
      title: 'Author Link',
      type: 'url',
    }),
    defineField({
      name: 'answer',
      title: 'Answers',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'answer' }], // This creates the dropdown to select answers
        },
      ],
      validation: (Rule) => Rule.required().min(1).error('At least one answer is required.'),
    }),
    defineField({
      name: 'throwOffAnswer',
      title: 'Throw Off Answer',
      type: 'string',
    }),
    defineField({
      name: 'img',
      title: 'Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
