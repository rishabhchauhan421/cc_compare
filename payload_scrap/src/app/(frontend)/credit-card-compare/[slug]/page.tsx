import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode } from 'next/headers'
import React, { cache, Key } from 'react'
import RichText from '@/components/RichText'
import { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { db } from '@/db/prismaDb'
import { cn } from '@/utilities/cn'
import { toTitleCase } from '@/utilities/toTitleCase'
import { CardComparison, CreditCardAttributes } from '@/utilities/cardComparison'
import { HotelUtils } from '@/utilities/hotelUtils'
import Link from 'next/link'

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
    include: {
      networkBrand: true,
    },
  })

  if (creditCards.length !== 2) {
    return <PayloadRedirects url={url} />
  }

  const card1 = creditCards[0]
  const card2 = creditCards[1]

  // Calcualtion

  const cardMaterialResult = CardComparison.compareCards({
    card1,
    card2,
    attr: CreditCardAttributes.cardMaterial,
  })
  const minAgeSalariedResult = CardComparison.compareCards({
    card1,
    card2,
    attr: CreditCardAttributes.minAgeSalaried,
  })
  const maxAgeSalariedResult = CardComparison.compareCards({
    card1,
    card2,
    attr: CreditCardAttributes.maxAgeSalaried,
  })
  const minNetIncomeSalariedResult = CardComparison.compareCards({
    card1,
    card2,
    attr: CreditCardAttributes.minNetIncomeSalaried,
  })
  const minAgeSelfEmployedResult = CardComparison.compareCards({
    card1,
    card2,
    attr: CreditCardAttributes.minAgeSelfEmployed,
  })
  const maxAgeSelfEmployedResult = CardComparison.compareCards({
    card1,
    card2,
    attr: CreditCardAttributes.maxAgeSelfEmployed,
  })
  const minNetIncomeSelfEmployedResult = CardComparison.compareCards({
    card1,
    card2,
    attr: CreditCardAttributes.minNetIncomeSelfEmployed,
  })

  const joiningFeeResult = CardComparison.compareCards({
    card1,
    card2,
    attr: CreditCardAttributes.joiningFee,
  })
  const annualFeeResult = CardComparison.compareCards({
    card1,
    card2,
    attr: CreditCardAttributes.annualFee,
  })

  // const pointValueResult = CardComparison.compareCards({
  //   card1,
  //   card2,
  //   attr: CreditCardAttributes.pointsValue,
  // })

  const allPointsPer100SpentResult = CardComparison.compareCards({
    card1,
    card2,
    attr: CreditCardAttributes.allPointsPer100Spent,
  })

  const travelPointsPer100SpentResult = CardComparison.compareCards({
    card1,
    card2,
    attr: CreditCardAttributes.travelPointsPer100Spent,
  })

  const shoppingPointsPer100SpentResult = CardComparison.compareCards({
    card1,
    card2,
    attr: CreditCardAttributes.shoppingPointsPer100Spent,
  })

  const diningPointsPer100SpentResult = CardComparison.compareCards({
    card1,
    card2,
    attr: CreditCardAttributes.diningPointsPer100Spent,
  })

  const fuelPointsPer100SpentResult = CardComparison.compareCards({
    card1,
    card2,
    attr: CreditCardAttributes.fuelPointsPer100Spent,
  })

  const groceryPointsPer100SpentResult = CardComparison.compareCards({
    card1,
    card2,
    attr: CreditCardAttributes.groceryPointsPer100Spent,
  })

  const utilityPointsPer100SpentResult = CardComparison.compareCards({
    card1,
    card2,
    attr: CreditCardAttributes.utilityPointsPer100Spent,
  })

  const membershipTajResult = CardComparison.compareCards({
    card1,
    card2,
    attr: CreditCardAttributes.membershipTaj,
  })

  const membershipBonvoyResult = CardComparison.compareCards({
    card1,
    card2,
    attr: CreditCardAttributes.membershipBonvoy,
  })
  const membershipHiltonHonorsResult = CardComparison.compareCards({
    card1,
    card2,
    attr: CreditCardAttributes.membershipHiltonHonors,
  })
  const membershipHotelRadissonResult = CardComparison.compareCards({
    card1,
    card2,
    attr: CreditCardAttributes.membershipHotelRadisson,
  })
  const membershipAccorPlusResult = CardComparison.compareCards({
    card1,
    card2,
    attr: CreditCardAttributes.membershipAccorPlus,
  })
  const membershipPostcardSunshineClubResult = CardComparison.compareCards({
    card1,
    card2,
    attr: CreditCardAttributes.membershipPostcardSunshineClub,
  })
  const membershipIPreferResult = CardComparison.compareCards({
    card1,
    card2,
    attr: CreditCardAttributes.membershipIPrefer,
  })

  const introductoryOffersResult = CardComparison.compareCards({
    card1,
    card2,
    attr: CreditCardAttributes.introductoryOffers,
  })

  return (
    <article className="pt-16 pb-16">
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />
      {/* TODO:  Add Breadcrumbs */}

      <div className="flex flex-col items-center gap-4 pt-8">
        {/* <ComparisonCard heading={'Travel'}>
          <ComparisonItem heading="Annual Fee" item1="₹5000" item2="₹10000" isItem1Better={true} />
        </ComparisonCard> */}

        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-4xl font-semibold text-white-900">
                {card1.name} vs {card2.name}
              </h1>
              {/* <p className="mt-2 text-sm text-gray-700">
                A list of all the users in your account including their name, title, email and role.
              </p> */}
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="w-full ">
                  <thead className="bg-white">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                      ></th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        <img src={card1.imageUrl} alt={card1.name} className="h-20 w-50" />
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        <img src={card2.imageUrl} alt={card2.name} className="h-20 w-50" />
                      </th>
                    </tr>
                  </thead>
                  <ComparisonCard>
                    <ComparisonItemRowFullWidth key={'basicWidth'} value={'Basic Information'} />
                    <ComparisonItemRow key={'basic-1'}>
                      <ComparisonItemHeadingCell value={'Network'} />
                      <ComparisonItemContentBoth
                        value1={card1.networkBrand.name}
                        value2={card2.networkBrand.name}
                        isCard1Better={false}
                        isCard2Better={false}
                      />
                    </ComparisonItemRow>
                    <ComparisonItemRow key={'basic-2'}>
                      <ComparisonItemHeadingCell value={'Material'} />
                      <ComparisonItemContentBoth
                        value1={toTitleCase(card1.cardMaterial)}
                        value2={toTitleCase(card2.cardMaterial)}
                        isCard1Better={cardMaterialResult.isCard1Better}
                        isCard2Better={cardMaterialResult.isCard2Better}
                      />
                    </ComparisonItemRow>
                    <ComparisonItemRow key={'basic-3'}>
                      <ComparisonItemHeadingCell value={'Requires Invitation'} />
                      <ComparisonItemContentBoth
                        value1={card1.isInviteOnly ? 'Yes' : 'No'}
                        value2={card2.isInviteOnly ? 'Yes' : 'No'}
                        isCard1Better={true}
                        isCard2Better={false}
                      />
                    </ComparisonItemRow>
                  </ComparisonCard>

                  <ComparisonCard>
                    <ComparisonItemRowFullWidth key={'eligibility'} value={'Eligibility'} />
                    {minAgeSalariedResult.show && (
                      <ComparisonItemRow key={'eligibility-1'}>
                        <ComparisonItemHeadingCell value={'Minimum Age Salaried'} />
                        <ComparisonItemContentBoth
                          value1={card1.minAgeSalaried.toString()}
                          value2={card2.minAgeSalaried.toString()}
                          isCard1Better={minAgeSalariedResult.isCard1Better}
                          isCard2Better={minAgeSalariedResult.isCard2Better}
                        />
                      </ComparisonItemRow>
                    )}
                    {maxAgeSalariedResult.show && (
                      <ComparisonItemRow key={'eligibility-2'}>
                        <ComparisonItemHeadingCell value={'Maximum Age Salaried'} />
                        <ComparisonItemContentBoth
                          value1={card1.maxAgeSalaried.toString()}
                          value2={card2.maxAgeSalaried.toString()}
                          isCard1Better={maxAgeSalariedResult.isCard1Better}
                          isCard2Better={maxAgeSalariedResult.isCard2Better}
                        />
                      </ComparisonItemRow>
                    )}
                    <ComparisonItemRow key={'eligibility-salary-1'}>
                      <ComparisonItemHeadingCell value={'Minimum Net Salary'} />
                      <ComparisonItemContentBoth
                        value1={'₹' + card1.minNetIncomeSalaried.toString() + ' Lakhs'}
                        value2={'₹' + card2.minNetIncomeSalaried.toString() + ' Lakhs'}
                        isCard1Better={minNetIncomeSalariedResult.isCard1Better}
                        isCard2Better={minNetIncomeSalariedResult.isCard2Better}
                      />
                    </ComparisonItemRow>
                    <ComparisonItemRow key={'eligibility-3'}>
                      <ComparisonItemHeadingCell value={'Minimum Age Self Employed'} />
                      <ComparisonItemContentBoth
                        value1={card1.minAgeSelfEmployed.toString()}
                        value2={card2.minAgeSelfEmployed.toString()}
                        isCard1Better={minAgeSelfEmployedResult.isCard1Better}
                        isCard2Better={minAgeSelfEmployedResult.isCard2Better}
                      />
                    </ComparisonItemRow>
                    <ComparisonItemRow key={'eligibility-4'}>
                      <ComparisonItemHeadingCell value={'Maximum Age Self Employed'} />
                      <ComparisonItemContentBoth
                        value1={card1.maxAgeSelfEmployed.toString()}
                        value2={card2.maxAgeSelfEmployed.toString()}
                        isCard1Better={maxAgeSelfEmployedResult.isCard1Better}
                        isCard2Better={maxAgeSelfEmployedResult.isCard2Better}
                      />
                    </ComparisonItemRow>
                    <ComparisonItemRow key={'eligibility-salary-2'}>
                      <ComparisonItemHeadingCell value={'Minimum Net Income for Self Employed'} />
                      <ComparisonItemContentBoth
                        value1={'₹' + card1.minNetIncomeSelfEmployed.toString() + ' Lakhs'}
                        value2={'₹' + card2.minNetIncomeSelfEmployed.toString() + ' Lakhs'}
                        isCard1Better={minNetIncomeSelfEmployedResult.isCard1Better}
                        isCard2Better={minNetIncomeSelfEmployedResult.isCard2Better}
                      />
                    </ComparisonItemRow>
                  </ComparisonCard>

                  <ComparisonCard>
                    <ComparisonItemRowFullWidth key={'points'} value={'Points'} />

                    <ComparisonItemRow key={'points-1'}>
                      <ComparisonItemHeadingCell value={'1 Point Value'} />
                      <ComparisonItemContentBoth
                        value1={card1.pointsValue.toString()}
                        value2={card2.pointsValue.toString()}
                        isCard1Better={card1.pointsValue > card2.pointsValue}
                        isCard2Better={card2.pointsValue > card1.pointsValue}
                      />
                    </ComparisonItemRow>
                    <ComparisonItemRow key={'points-category-travel'}>
                      <ComparisonItemHeadingCell value={'Travel Points Per ₹100'} />
                      <ComparisonItemContentBoth
                        value1={card1.travelPointsPer100.toString()}
                        value2={card2.travelPointsPer100.toString()}
                        isCard1Better={card1.travelPointsPer100 > card2.travelPointsPer100}
                        isCard2Better={card2.travelPointsPer100 > card1.travelPointsPer100}
                      />
                    </ComparisonItemRow>
                    <ComparisonItemRow key={'points-category-shopping'}>
                      <ComparisonItemHeadingCell value={'Shopping Points Per ₹100'} />
                      <ComparisonItemContentBoth
                        value1={card1.shoppingPointsPer100.toString()}
                        value2={card2.shoppingPointsPer100.toString()}
                        isCard1Better={card1.shoppingPointsPer100 > card2.shoppingPointsPer100}
                        isCard2Better={card2.shoppingPointsPer100 > card1.shoppingPointsPer100}
                      />
                    </ComparisonItemRow>
                    <ComparisonItemRow key={'points-category-dinning'}>
                      <ComparisonItemHeadingCell value={'Dining Points Per ₹100'} />
                      <ComparisonItemContentBoth
                        value1={card1.diningPointsPer100.toString()}
                        value2={card2.diningPointsPer100.toString()}
                        isCard1Better={card1.diningPointsPer100 > card2.diningPointsPer100}
                        isCard2Better={card2.diningPointsPer100 > card1.diningPointsPer100}
                      />
                    </ComparisonItemRow>
                    <ComparisonItemRow key={'points-category-fuel'}>
                      <ComparisonItemHeadingCell value={'Fuel Points Per ₹100'} />
                      <ComparisonItemContentBoth
                        value1={card1.fuelPointsPer100.toString()}
                        value2={card2.fuelPointsPer100.toString()}
                        isCard1Better={card1.fuelPointsPer100 > card2.fuelPointsPer100}
                        isCard2Better={card2.fuelPointsPer100 > card1.fuelPointsPer100}
                      />
                    </ComparisonItemRow>
                    <ComparisonItemRow key={'points-category-grocery'}>
                      <ComparisonItemHeadingCell value={'Grocery Points Per ₹100'} />
                      <ComparisonItemContentBoth
                        value1={card1.groceryPointsPer100.toString()}
                        value2={card2.groceryPointsPer100.toString()}
                        isCard1Better={card1.groceryPointsPer100 > card2.groceryPointsPer100}
                        isCard2Better={card2.groceryPointsPer100 > card1.groceryPointsPer100}
                      />
                    </ComparisonItemRow>
                    <ComparisonItemRow key={'points-category-utility'}>
                      <ComparisonItemHeadingCell value={'Utility Points Per ₹100'} />
                      <ComparisonItemContentBoth
                        value1={card1.utilityPointsPer100.toString()}
                        value2={card2.utilityPointsPer100.toString()}
                        isCard1Better={card1.utilityPointsPer100 > card2.utilityPointsPer100}
                        isCard2Better={card2.utilityPointsPer100 > card1.utilityPointsPer100}
                      />
                    </ComparisonItemRow>
                  </ComparisonCard>

                  <ComparisonCard>
                    <ComparisonItemRowFullWidth key={'fees'} value={'Fees and Charges'} />
                    {joiningFeeResult.show && (
                      <ComparisonItemRow key={'fees-1'}>
                        <ComparisonItemHeadingCell value={'Joining Fee'} />
                        <ComparisonItemContentBoth
                          value1={'₹' + card1.joiningFee}
                          value2={'₹' + card2.joiningFee}
                          isCard1Better={card1.joiningFee < card2.joiningFee}
                          isCard2Better={card1.joiningFee > card2.joiningFee}
                        />
                      </ComparisonItemRow>
                    )}
                    {joiningFeeResult.show && (
                      <ComparisonItemRow key={'fees-2'}>
                        <ComparisonItemHeadingCell value={'Annual Fee'} />
                        <ComparisonItemContentBoth
                          value1={'₹' + card1.annualFee}
                          value2={'₹' + card2.annualFee}
                          isCard1Better={card1.annualFee < card2.annualFee}
                          isCard2Better={card1.annualFee > card2.annualFee}
                        />
                      </ComparisonItemRow>
                    )}
                    <ComparisonItemRow key={'basic-2'}>
                      <ComparisonItemHeadingCell value={'Material'} />
                      <ComparisonItemContentBoth
                        value1={toTitleCase(card1.cardMaterial)}
                        value2={toTitleCase(card2.cardMaterial)}
                        isCard1Better={cardMaterialResult.isCard1Better}
                        isCard2Better={cardMaterialResult.isCard2Better}
                      />
                    </ComparisonItemRow>
                    <ComparisonItemRow key={'basic-3'}>
                      <ComparisonItemHeadingCell value={'Requires Invitation'} />
                      <ComparisonItemContentBoth
                        value1={card1.isInviteOnly ? 'Yes' : 'No'}
                        value2={card2.isInviteOnly ? 'Yes' : 'No'}
                        isCard1Better={true}
                        isCard2Better={false}
                      />
                    </ComparisonItemRow>
                  </ComparisonCard>

                  <ComparisonCard>
                    <ComparisonItemRowFullWidth
                      key={'hotels-memberships'}
                      value={'Hotels & Memberships'}
                    />
                    {membershipTajResult.show && (
                      <ComparisonItemRow key={'hotels-1'}>
                        <ComparisonItemHeadingCell value={'Taj Epicure'} />
                        <ComparisonItemContentBoth
                          value1={HotelUtils.getTajMembershipData(card1.membershipTaj).name}
                          value2={HotelUtils.getTajMembershipData(card2.membershipTaj).name}
                          isCard1Better={membershipTajResult.isCard1Better}
                          isCard2Better={membershipTajResult.isCard2Better}
                        />
                      </ComparisonItemRow>
                    )}
                    {membershipBonvoyResult.show && (
                      <ComparisonItemRow key={'hotels-2'}>
                        <ComparisonItemHeadingCell value={'Mariott Bonvoy'} />
                        <ComparisonItemContentBoth
                          value1={HotelUtils.getBonvoyMembershipData(card1.membershipBonvoy).name}
                          value2={HotelUtils.getBonvoyMembershipData(card2.membershipBonvoy).name}
                          isCard1Better={membershipBonvoyResult.isCard1Better}
                          isCard2Better={membershipBonvoyResult.isCard2Better}
                        />
                      </ComparisonItemRow>
                    )}
                    {membershipHiltonHonorsResult.show && (
                      <ComparisonItemRow key={'hotels-3'}>
                        <ComparisonItemHeadingCell value={'Hilton Honors'} />
                        <ComparisonItemContentBoth
                          value1={
                            HotelUtils.getHiltonHonorsMembershipData(card1.membershipHiltonHonors)
                              .name
                          }
                          value2={
                            HotelUtils.getHiltonHonorsMembershipData(card2.membershipHiltonHonors)
                              .name
                          }
                          isCard1Better={membershipHiltonHonorsResult.isCard1Better}
                          isCard2Better={membershipHiltonHonorsResult.isCard2Better}
                        />
                      </ComparisonItemRow>
                    )}
                    {membershipHotelRadissonResult.show && (
                      <ComparisonItemRow key={'hotels-4'}>
                        <ComparisonItemHeadingCell value={'Radisson Membership'} />
                        <ComparisonItemContentBoth
                          value1={
                            HotelUtils.getRadissonMembershipData(card1.membershipHotelRadisson).name
                          }
                          value2={
                            HotelUtils.getRadissonMembershipData(card2.membershipHotelRadisson).name
                          }
                          isCard1Better={membershipHotelRadissonResult.isCard1Better}
                          isCard2Better={membershipHotelRadissonResult.isCard2Better}
                        />
                      </ComparisonItemRow>
                    )}
                    {membershipAccorPlusResult.show && (
                      <ComparisonItemRow key={'hotels-5'}>
                        <ComparisonItemHeadingCell value={'Accor Plus'} />
                        <ComparisonItemContentBoth
                          value1={
                            HotelUtils.getAccorPlusMembershipData(card1.membershipAccorPlus).name
                          }
                          value2={
                            HotelUtils.getAccorPlusMembershipData(card2.membershipAccorPlus).name
                          }
                          isCard1Better={membershipAccorPlusResult.isCard1Better}
                          isCard2Better={membershipAccorPlusResult.isCard2Better}
                        />
                      </ComparisonItemRow>
                    )}
                    {membershipIPreferResult.show && (
                      <ComparisonItemRow key={'hotels-6'}>
                        <ComparisonItemHeadingCell value={'IPrefer Hotel Rewards'} />
                        <ComparisonItemContentBoth
                          value1={HotelUtils.getIPreferMembershipData(card1.membershipIPrefer).name}
                          value2={HotelUtils.getIPreferMembershipData(card2.membershipIPrefer).name}
                          isCard1Better={membershipIPreferResult.isCard1Better}
                          isCard2Better={membershipIPreferResult.isCard2Better}
                        />
                      </ComparisonItemRow>
                    )}
                    {membershipPostcardSunshineClubResult.show && (
                      <ComparisonItemRow key={'hotels-7'}>
                        <ComparisonItemHeadingCell value={'Sunchine Club Membership'} />
                        <ComparisonItemContentBoth
                          value1={
                            HotelUtils.getSunshineClubMembershipData(
                              card1.membershipPostcardSunshineClub,
                            ).name
                          }
                          value2={
                            HotelUtils.getSunshineClubMembershipData(
                              card2.membershipPostcardSunshineClub,
                            ).name
                          }
                          isCard1Better={membershipPostcardSunshineClubResult.isCard1Better}
                          isCard2Better={membershipPostcardSunshineClubResult.isCard2Better}
                        />
                      </ComparisonItemRow>
                    )}
                  </ComparisonCard>
                  <ComparisonCard>
                    <ComparisonItemRowFullWidth key={'Intro Offers'} value={'Intro Offers'} />
                    {introductoryOffersResult.show && (
                      <ComparisonItemRow key={'intro-offers'}>
                        <ComparisonItemHeadingCell value={'Introductory Offers'} />
                        <ComparisonItemContentBoth
                          value1={card1.introductoryOffers}
                          value2={card2.introductoryOffers}
                          isCard1Better={introductoryOffersResult.isCard1Better}
                          isCard2Better={introductoryOffersResult.isCard2Better}
                        />
                      </ComparisonItemRow>
                    )}

                    <ComparisonItemRow key={'affiliate-links'}>
                      <ComparisonItemHeadingCell value={'Apply Now'} />
                      <td
                        key=""
                        // className="whitespace-normal break-words px-3 py-4 text-sm text-gray-500 sm:whitespace-nowrap sm:truncate"
                        style={{ maxWidth: '150px' }}
                      >
                        <Link
                          href={card1.affiliateUrl}
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-center"
                        >
                          Apply Now
                        </Link>
                      </td>
                      <td
                        key="23"
                        // className="whitespace-normal break-words px-3 py-4 text-sm text-gray-500 sm:whitespace-nowrap sm:truncate"
                        style={{ maxWidth: '150px' }}
                      >
                        <Link
                          href={card1.affiliateUrl}
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-center"
                        >
                          Apply Now
                        </Link>
                      </td>
                    </ComparisonItemRow>
                  </ComparisonCard>
                </table>
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
      </div>
    </article>
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
    <tbody className="bg-white border-y-8">
      <Fragment>{children}</Fragment>
    </tbody>
  )
}

const ComparisonItemRowFullWidth = ({ key, value }: { key: Key; value: String }) => {
  return (
    <tr className="border-t border-gray-200" key={key}>
      <th
        scope="colgroup"
        colSpan={3}
        className="bg-gray-50 py-2 pl-4 pr-3 text-left text-3xl font-semibold text-gray-900 sm:pl-3"
      >
        <h3>{value}</h3>
      </th>
    </tr>
  )
}
const ComparisonItemRow = ({ key, children }: { key: Key; children: React.ReactNode }) => {
  return (
    <tr className="border-t border-gray-200" key={key}>
      {children}
    </tr>
  )
}
const ComparisonItemHeadingCell = ({ value }: { value: String }) => {
  return <td className=" py-4 pl-4 pr-3 text-md  font-medium text-gray-900 sm:pl-3">{value}</td>
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
          'whitespace-normal break-words px-3 py-4 text-sm text-gray-500 sm:whitespace-nowrap sm:truncate ' +
          card1Formatting
        }
        style={{ maxWidth: '150px' }}
      >
        {value1}
      </td>
      <td
        key="23"
        className={
          'whitespace-normal break-words px-3 py-4 text-sm text-gray-500 sm:whitespace-nowrap sm:truncate ' +
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
