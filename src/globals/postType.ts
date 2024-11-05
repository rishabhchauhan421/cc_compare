import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidatePostType } from './hooks/revalidatePostType'

export const postType: GlobalConfig = {
  slug: 'postType',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'Post Type',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
    },
  ],
  hooks: {
    afterChange: [revalidatePostType],
  },
}
