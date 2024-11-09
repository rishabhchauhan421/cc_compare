import React, { Fragment } from 'react'

import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Heading, Subheading } from '@/components/text'
import { db } from '@/db/prismaDb'

export async function generateStaticParams() {
  const creditCards = await db.creditCard.findMany({
    select: {
      slug: true,
    },
  })

  //take two credit cards and add -vs- between their slugs and create combinations
  const slugs = creditCards.map((creditCard: any) => creditCard.slug)
  const params = slugs.flatMap((slug1: string, index: any) => {
    return slugs.slice(index + 1).map((slug2: string) => {
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
  const creditCards = await db.creditCard.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
  })

  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
        <Subheading className="mt-16">
          {/* {dayjs(card1.createdAt).format('dddd, MMMM D, YYYY')} */}
        </Subheading>
        <Heading as="h1" className="mt-2">
          {/* {card1.name} vs {card2.name} */}
        </Heading>

        {/* <article className="pb-16 pt-16"> */}
        {/* TODO:  Add Breadcrumbs */}

        {/* <div className="flex flex-col items-center gap-4 pt-8"> */}
        {/* <ComparisonCard heading={'Travel'}>
          <ComparisonItem heading="Annual Fee" item1="₹5000" item2="₹10000" isItem1Better={true} />
        </ComparisonCard> */}

        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              {/* <h1 className="text-white-900 text-4xl font-semibold">
                    {card1.name} vs {card2.name}
                  </h1> */}
              {/* <p className="mt-2 text-sm text-gray-700">
                A list of all the users in your account including their name, title, email and role.
              </p> */}
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                {/* TODO */}
              </div>
            </div>
          </div>
        </div>

        {/* {post.relatedPosts && post.relatedPosts.length > 0 && (
          <RelatedPosts
            className="mt-12"
            docs={post.relatedPosts.filter((post) => typeof post === 'object')}
          />
        )} */}
        {/* </div> */}
        {/* </article> */}
        <div className="mt-3"></div>
      </Container>
      <Footer />
    </main>
  )
}

// export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
//   const { slug = '' } = await paramsPromise
//   const post = await queryPostBySlug({ slug })

//   return generateMeta({ doc: post })
// }

// const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
//   const { isEnabled: draft } = await draftMode()

//   const payload = await getPayloadHMR({ config: configPromise })

//   const result = await payload.find({
//     collection: 'posts',
//     draft,
//     limit: 1,
//     overrideAccess: draft,
//     where: {
//       slug: {
//         equals: slug,
//       },
//     },
//   })

//   return result.docs?.[0] || null
// })

const items = [
  { id: 1 },
  // More items...
]
const ComparisonCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <tbody className="border-y-8 bg-white">
      <Fragment>{children}</Fragment>
    </tbody>
  )
}

const ComparisonItemRowFullWidth = ({
  key,
  value,
}: {
  key: string
  value: String
}) => {
  return (
    <tr className="border-t border-gray-200" key={key}>
      <th
        scope="colgroup"
        colSpan={3}
        className="bg-gray-50 py-2 text-left text-3xl font-semibold text-gray-900 sm:pl-3"
      >
        <h3>{value}</h3>
      </th>
    </tr>
  )
}
const ComparisonItemRow = ({
  key,
  children,
}: {
  key: string
  children: React.ReactNode
}) => {
  return (
    <tr className="border-t border-gray-200" key={key}>
      {children}
    </tr>
  )
}
const ComparisonItemHeadingCell = ({ value }: { value: String }) => {
  return <td className="text-md font-medium text-gray-900 sm:pl-3">{value}</td>
}
const ComparisonItemContentBoth = ({
  value1,
  value2,
  isCard1Better,
  isCard2Better,
}: {
  value1: String
  value2: String
  isCard1Better: Boolean
  isCard2Better: Boolean
}) => {
  const card1Formatting = isCard1Better ? 'bg-green-200' : ''
  const card2Formatting = isCard2Better ? 'bg-green-200' : ''
  return (
    <>
      <td
        key=""
        className={
          'whitespace-normal break-words px-3 py-4 text-sm text-gray-500 sm:truncate sm:whitespace-nowrap ' +
          card1Formatting
        }
        style={{ maxWidth: '150px' }}
      >
        {value1}
      </td>
      <td
        key="23"
        className={
          'break-wordspy-4 whitespace-normal text-sm text-gray-500 sm:truncate sm:whitespace-nowrap ' +
          card2Formatting
        }
        style={{ maxWidth: '150px' }}
      >
        {value2}
      </td>
    </>
  )
}
// const ComparisonItemContentCell = ({ value }: { value: String }) => {
//   return (
//     <td
//       className="whitespace-normal break-words px-3 py-4 text-sm text-gray-500 sm:whitespace-nowrap sm:truncate"
//       style={{ maxWidth: '150px' }}
//     >
//       {value}
//     </td>
//   )
// }
