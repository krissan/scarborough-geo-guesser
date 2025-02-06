import { defineField, defineType } from 'sanity'
import { v4 as uuidv4 } from 'uuid'

export default defineType({
  name: 'answer',
  title: 'Answer',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
      initialValue: () => uuidv4(), // Ensure the UUID is set on creation
      hidden: true, // Make the field hidden so it doesn't show in the studio
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      validation: (Rule) => Rule.required().error('Answer text is required.'),
    }),
  ],
  preview: {
    select: {
      title: 'text',
    },
  },
})
