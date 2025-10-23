import { Container } from '@/components/container';
// import { Footer } from '@/components/footer';
import { GradientBackground } from '@/components/gradient';
import { MobileNav } from '@/components/nav/mobile-nav';
import { Heading, Subheading } from '@/components/text';
import { db } from '@/db/prismaDb';
import { toTitleCase } from '@/utils/toTitleCase';
import { CreditCard } from '@prisma/client';
// import { env } from '@/env';
import Link from 'next/link';

// export async function generateStaticParams() {
//   const creditCards = await db.creditCard.findMany({
//     select: {
//       slug: true,
//     },
//   })

//   //take two credit cards and add -vs- between their slugs and create combinations
//   const slugs = creditCards.map((creditCard: any) => creditCard.slug)
//   const params = slugs.flatMap((slug1: string, index: any) => {
//     return slugs.slice(index + 1).map((slug2: string) => {
//       return {
//         slug: slug1 + '-vs-' + slug2,
//       }
//     })
//   })
//   // const params = [
//   //   {
//   //     slug: 'amex-rewards-credit-card-vs-hdfc-regalia-credit-card',
//   //   },
//   //   {
//   //     slug: 'amex-platinum-card-vs-hdfc-infinia',
//   //   },
//   // ]

//   return params
// }

const totalCards = await db.creditCard.count();

type Args = {
  params: Promise<{
    slug?: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function getCreditCards({ params, searchParams }: Args) {
  const searchParamsProp = await searchParams;
  const page = parseInt((searchParamsProp.page as string) ?? '1');
  const limit = 9;

  const creditCards = await db.creditCard.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  return creditCards;
}

export default async function page(props: Args) {
  const searchParams = await props.searchParams;
  const page = parseInt((searchParams.page as string) ?? '1');
  const limit = 9;
  const creditCards = await getCreditCards({
    params: props.params,
    searchParams: props.searchParams,
  });

  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <MobileNav />
        <Subheading className="mt-16">
          {/* {dayjs(card1.createdAt).format('dddd, MMMM D, YYYY')} */}
        </Subheading>
        <Heading as="h1" className="mb-10 mt-2">
          Credit Cards
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
              {/* <h1 className="pb-8 text-2xl font-semibold text-gray-900">
                {' '}
                Credit Card Compare
              </h1> */}

              <ul
                role="list"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {creditCards.map((creditCard: CreditCard) => (
                  <li
                    key={creditCard.id}
                    className="group relative overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-100 transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    <Link href={`/credit-card/${creditCard.slug}`} prefetch>
                      <div className="flex flex-col items-center p-6 text-center">
                        <img
                          src={creditCard.imageUrl}
                          alt={creditCard.name}
                          className="h-24 w-auto object-contain mb-4 transition-transform duration-300 group-hover:scale-105"
                        />
                        <h3 className="text-base font-semibold text-gray-900">
                          {toTitleCase(creditCard.name)}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Compare features, rewards, and benefits
                        </p>
                        <button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90">
                          Compare Now
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-4 w-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.25 8.25L21 12l-3.75 3.75M3 12h18"
                            />
                          </svg>
                        </button>
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
                    {creditCards.length > 0 ? (
                      <p className="text-sm text-gray-700">
                        Showing{' '}
                        <span className="font-medium">
                          {(page - 1) * limit + 1}
                        </span>{' '}
                        to{' '}
                        <span className="font-medium">
                          {(page - 1) * limit + creditCards.length}
                        </span>{' '}
                        of <span className="font-medium">{totalCards}</span>{' '}
                        results
                      </p>
                    ) : (
                      <p className="text-sm text-gray-700">
                        No credit cards found.
                      </p>
                    )}
                  </div>
                  <div className="flex flex-1 justify-between sm:justify-end">
                    {page > 1 && (
                      <Link
                        href={`/credit-card?page=${page - 1}`}
                        className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                      >
                        Previous
                      </Link>
                    )}
                    {creditCards.length >= limit && (
                      <Link
                        href={`/credit-card?page=${page + 1}`}
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
      {/* <Footer /> */}
    </main>
  );
}

export async function generateMetadata(props: Args) {
  const comparisonSlug = await getCreditCards({
    params: props.params,
    searchParams: props.searchParams,
  });

  return {
    title: `Credit Card vs Credit Card: Which is better`,
    description: `Discover how credit cards stack up against each other in terms of cashback, annual fees, and exclusive perks.`,
    authors: {
      name: `Rishabh Chauhan`,
      // url: `${env.NEXT_PUBLIC_BASE_URL}/artist/${product.user.username}`,
    },
    keywords: [
      `credit cards`,
      `credit card list`,
      `credit cards in credit card`,
      `credit card comparison india`,
    ],
    publisher: process.env.siteName,
    openGraph: {
      type: 'website',
      title: `Credit Card vs Credit Card: Which is better`,
      description: `Discover how credit cards stack up against each other in terms of cashback, annual fees, and exclusive perks.`,
      countryName: process.env.seoBaseCountry,
      // siteName: env.NEXT_PUBLIC_siteName,
    },
  };
}
