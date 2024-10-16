import { type SchemaTypeDefinition } from 'sanity'

import photos from './schemas/photos'
import answers from './schemas/answers'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [photos, answers],
}