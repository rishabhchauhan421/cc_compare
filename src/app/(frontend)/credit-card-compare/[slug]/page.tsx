import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { db } from '@/db/prismaDb'

export async function generateStaticParams() {
  const creditCards = await db.creditCard.findMany({
    select: {
      slug: true,
    },
  })

  //take two credit cards and add -vs- between their slugs and create combinations
  const slugs = creditCards.map((creditCard) => creditCard.slug)
  const params = slugs.flatMap((slug1, index) => {
    return slugs.slice(index + 1).map((slug2) => {
      return {
        slug: slug1 + '-vs-' + slug2,
      }
    })
  })
  // const params = [
  //   {
  //     slug: 'amex-rewards-credit-card-vs-hdfc-regalia-credit-card',
  //   },
  //   {
  //     slug: 'amex-platinum-card-vs-hdfc-infinia',
  //   },
  // ]

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const url = '/credit-card-compare/' + slug

  // if slug contains vs
  const isValidCompareSlug = slug.includes('vs')
  if (!isValidCompareSlug) {
    return <PayloadRedirects url={url} />
  }

  const creditCardSlugs = slug.split('-vs-')
  const creditCards = await db.creditCard.findMany({
    where: {
      slug: {
        in: creditCardSlugs,
      },
    },
  })

  if (creditCards.length !== 2) {
    return <PayloadRedirects url={url} />
  }

  // console.log({ creditCards })

  // const post = await queryPostBySlug({ slug })

  // if (!post) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {/* <PostHero post={post} /> */}

      <div className="flex flex-col items-center gap-4 pt-8">
        {creditCards.map((creditCard) => (
          <div key={creditCard.slug} className="flex flex-col items-center gap-4">
            <img src={creditCard.imageUrl} alt={creditCard.name} className="w-32 h-32" />
            <h1 className="text-xl font-bold">{creditCard.name}</h1>
          </div>
        ))}
        {/* <div className="container lg:mx-0 lg:grid lg:grid-cols-[1fr_48rem_1fr] grid-rows-[1fr]">
          <RichText
            className="lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[1fr]"
            content={post.content}
            enableGutter={false}
          />
        </div> */}

        {/* {post.relatedPosts && post.relatedPosts.length > 0 && (
          <RelatedPosts
            className="mt-12"
            docs={post.relatedPosts.filter((post) => typeof post === 'object')}
          />
        )} */}
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
