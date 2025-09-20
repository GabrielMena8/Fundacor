declare module '@sanity/image-url' {
  import type { SanityClient } from '@sanity/client'
  interface ImageBuilderChain {
    width: (w: number) => ImageBuilderChain
    height: (h: number) => ImageBuilderChain
    quality: (q: number) => ImageBuilderChain
    fit: (f: string) => ImageBuilderChain
    format: (fmt: string) => ImageBuilderChain
    auto: (val: string) => ImageBuilderChain
    url: () => string
  }
  interface ImageUrlBuilder {
    image: (source: unknown) => ImageBuilderChain
  }
  export default function imageUrlBuilder(client: SanityClient): ImageUrlBuilder
}
