declare module '*.mdx' {
  import type { ComponentType } from 'react'

  const Content: ComponentType
  export default Content

  export const meta: {
    title: string
    slug: string
    category: string
    description: string
  }
}
