import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Heading, Subheading } from '@/components/text'
import { db } from '@/db/prismaDb'
import Link from 'next/link'

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
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Post({
  params: paramsPromise,
  searchParams,
}: Args) {
  const page = parseInt((searchParams.page as string) ?? '1')
  const limit = 9

  const comparisonSlug = await db.comparisonSlug.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
    skip: (page - 1) * limit,
    take: limit,
  })
  // console.log(comparisonSlug.length)

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
              <h1 className="pb-8 text-2xl font-semibold text-gray-900">
                {' '}
                Credit Card Compare
              </h1>

              <ul
                role="list"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {comparisonSlug.map((comparisonSlug) => (
                  <li
                    key={comparisonSlug.comparisonSlugId}
                    className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
                  >
                    <Link
                      prefetch
                      href={`/credit-card-compare/${comparisonSlug.slug}`}
                    >
                      <div className="-mt-px flex divide-x divide-gray-200">
                        <div className="flex w-0 flex-1">
                          <img
                            src={comparisonSlug.card1ImageUrl}
                            alt={comparisonSlug.name.split(' vs ')[0]}
                            className="aspect-ratio: 1 / 3; h-20 flex-1"
                          />
                        </div>
                        <div className="-ml-px flex w-0 flex-1">
                          <img
                            src={comparisonSlug.card2ImageUrl}
                            className="aspect-ratio: 1 / 3; h-20 flex-1"
                            alt={comparisonSlug.name.split(' vs ')[1]}
                          />
                        </div>
                      </div>
                      <div className="flex w-full items-center justify-between space-x-6 p-6">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-sm font-medium text-gray-900">
                              {comparisonSlug.name}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <nav
                  aria-label="Pagination"
                  className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                >
                  <div className="hidden sm:block">
                    <p className="text-sm text-gray-700">
                      Showing{' '}
                      <span className="font-medium">
                        {comparisonSlug.length}
                      </span>{' '}
                      to{' '}
                      <span className="font-medium">{(page - 1) * limit}</span>{' '}
                      of{' '}
                      <span className="font-medium">
                        {page * comparisonSlug.length}
                      </span>{' '}
                      results
                    </p>
                  </div>
                  <div className="flex flex-1 justify-between sm:justify-end">
                    {page > 1 && (
                      <Link
                        href={`/credit-card-compare?page=${page - 1}`}
                        className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                      >
                        Previous
                      </Link>
                    )}
                    {comparisonSlug.length >= limit && (
                      <Link
                        href={`/credit-card-compare?page=${page + 1}`}
                        className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                      >
                        Next
                      </Link>
                    )}
                  </div>
                </nav>
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
