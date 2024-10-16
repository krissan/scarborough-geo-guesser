import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'answer',
  title: 'Answer',
  type: 'document',
  fields: [
    defineField({
      title: 'Answer',
      name: 'answer',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().unique().error('Each answer must be unique.'),
    })
  ]
})
