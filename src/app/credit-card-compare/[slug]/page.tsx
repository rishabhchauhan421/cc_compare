import React, { Fragment } from 'react'

import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Heading, Subheading } from '@/components/text'
import { db } from '@/db/prismaDb'
import { env } from '@/env'
import { CardComparison, CreditCardAttributes } from '@/utils/cardComparison'
import { HotelUtils } from '@/utils/hotelUtils'
import { NetworkUtils } from '@/utils/networkUtils'
import { toTitleCase } from '@/utils/toTitleCase'
import dayjs from 'dayjs'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

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
  const { slug = '' } = await paramsPromise
  const url = '/credit-card-compare/' + slug

  // if slug contains vs
  const isValidCompareSlug = slug.includes('vs')
  if (!isValidCompareSlug) {
    return notFound()
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
    return notFound()
  }

  const recentCreditCards = await db.creditCard.findMany({
    take: 11,
    orderBy: {
      updatedAt: 'desc',
    },
  })

  const card1 = creditCards[0]
  const card2 = creditCards[1]
  console.log(card1.travelPointsPer100, card2.travelPointsPer100)
  // Calcualtion

  const cardMaterialResult = CardComparison.compareCards({
    card1,
    card2,
    attr: CreditCardAttributes.cardMaterial,
  })
  const isInviteOnlyResult = CardComparison.compareCards({
    card1,
    card2,
    attr: CreditCardAttributes.isInviteOnly,
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

  const minAmountForAnnualFeeWaiverResult = CardComparison.compareCards({
    card1,
    card2,
    attr: CreditCardAttributes.minAmountForAnnualFeeWaiver,
  })

  const signupBonusValueResult = CardComparison.compareCards({
    card1,
    card2,
    attr: CreditCardAttributes.signupBonusValue,
  })

  const signupBonusTermsResult = CardComparison.compareCards({
    card1,
    card2,
    attr: CreditCardAttributes.signupBonusTerms,
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
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
        <Subheading className="mt-16">
          {dayjs(card1.createdAt).format('dddd, MMMM D, YYYY')}
        </Subheading>
        <Heading as="h1" className="mt-2">
          {card1.name} vs {card2.name}
        </Heading>
        {/* <article className="pb-16 pt-16"> */}
        {/* TODO:  Add Breadcrumbs */}
        {/* <div className="flex flex-col items-center gap-4 pt-8"> */}
        {/* <ComparisonCard heading={'Travel'}>
          <ComparisonItem heading="Annual Fee" item1="₹5000" item2="₹10000" isItem1Better={true} />
        </ComparisonCard> */}
        <div className="sm:2">
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
                <table className="w-full">
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
                        <img
                          src={card1.imageUrl}
                          alt={card1.name}
                          className="w-50 h-20"
                        />
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        <img
                          src={card2.imageUrl}
                          alt={card2.name}
                          className="w-50 h-20"
                        />
                      </th>
                    </tr>
                  </thead>
                  <ComparisonCard>
                    <ComparisonItemRowFullWidth value={'Basic Information'} />
                    <ComparisonItemRow>
                      <ComparisonItemHeadingCell value={'Network'} />
                      <ComparisonItemContentBoth
                        value1={
                          NetworkUtils.getNetworkDetails(card1.networkBrands[0])
                            .name
                        }
                        value2={
                          NetworkUtils.getNetworkDetails(card2.networkBrands[0])
                            .name
                        }
                        value1Array={Array.from(
                          card1.networkBrands.map((brand) => {
                            return NetworkUtils.getNetworkDetails(brand).name
                          }),
                        )}
                        value2Array={Array.from(
                          card2.networkBrands.map((brand) => {
                            return NetworkUtils.getNetworkDetails(brand).name
                          }),
                        )}
                        isCard1Better={false}
                        isCard2Better={false}
                      />
                    </ComparisonItemRow>
                    <ComparisonItemRow>
                      <ComparisonItemHeadingCell value={'Material'} />
                      <ComparisonItemContentBoth
                        value1={toTitleCase(card1.cardMaterial)}
                        value2={toTitleCase(card2.cardMaterial)}
                        isCard1Better={cardMaterialResult.isCard1Better}
                        isCard2Better={cardMaterialResult.isCard2Better}
                      />
                    </ComparisonItemRow>
                    {isInviteOnlyResult.show && (
                      <ComparisonItemRow key={'basic-3'}>
                        <ComparisonItemHeadingCell
                          value={'Requires Invitation'}
                        />
                        <ComparisonItemContentBoth
                          value1={card1.isInviteOnly ? 'Yes' : 'No'}
                          value2={card2.isInviteOnly ? 'Yes' : 'No'}
                          isCard1Better={isInviteOnlyResult.isCard1Better}
                          isCard2Better={isInviteOnlyResult.isCard2Better}
                        />
                      </ComparisonItemRow>
                    )}
                  </ComparisonCard>

                  <ComparisonCard>
                    <ComparisonItemRowFullWidth
                      key={'eligibility'}
                      value={'Eligibility'}
                    />
                    {minAgeSalariedResult.show && (
                      <ComparisonItemRow key={'eligibility-1'}>
                        <ComparisonItemHeadingCell
                          value={'Minimum Age Salaried'}
                        />
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
                        <ComparisonItemHeadingCell
                          value={'Maximum Age Salaried'}
                        />
                        <ComparisonItemContentBoth
                          value1={
                            card1.maxAgeSalaried === 100
                              ? 'Not Specified'
                              : card1.maxAgeSalaried.toString()
                          }
                          value2={
                            card2.maxAgeSalaried === 100
                              ? 'Not Specified'
                              : card2.maxAgeSalaried.toString()
                          }
                          isCard1Better={maxAgeSalariedResult.isCard1Better}
                          isCard2Better={maxAgeSalariedResult.isCard2Better}
                        />
                      </ComparisonItemRow>
                    )}
                    <ComparisonItemRow key={'eligibility-salary-1'}>
                      <ComparisonItemHeadingCell value={'Minimum Net Salary'} />
                      <ComparisonItemContentBoth
                        value1={
                          '₹' + card1.minNetIncomeSalaried.toString() + ' Lakhs'
                        }
                        value2={
                          '₹' + card2.minNetIncomeSalaried.toString() + ' Lakhs'
                        }
                        isCard1Better={minNetIncomeSalariedResult.isCard1Better}
                        isCard2Better={minNetIncomeSalariedResult.isCard2Better}
                      />
                    </ComparisonItemRow>
                    <ComparisonItemRow key={'eligibility-3'}>
                      <ComparisonItemHeadingCell
                        value={'Minimum Age Self Employed'}
                      />
                      <ComparisonItemContentBoth
                        value1={card1.minAgeSelfEmployed.toString()}
                        value2={card2.minAgeSelfEmployed.toString()}
                        isCard1Better={minAgeSelfEmployedResult.isCard1Better}
                        isCard2Better={minAgeSelfEmployedResult.isCard2Better}
                      />
                    </ComparisonItemRow>
                    <ComparisonItemRow key={'eligibility-4'}>
                      <ComparisonItemHeadingCell
                        value={'Maximum Age Self Employed'}
                      />
                      <ComparisonItemContentBoth
                        value1={card1.maxAgeSelfEmployed.toString()}
                        value2={card2.maxAgeSelfEmployed.toString()}
                        isCard1Better={maxAgeSelfEmployedResult.isCard1Better}
                        isCard2Better={maxAgeSelfEmployedResult.isCard2Better}
                      />
                    </ComparisonItemRow>
                    <ComparisonItemRow key={'eligibility-salary-2'}>
                      <ComparisonItemHeadingCell
                        value={'Minimum Net Income for Self Employed'}
                      />
                      <ComparisonItemContentBoth
                        value1={
                          '₹' +
                          card1.minNetIncomeSelfEmployed.toString() +
                          ' Lakhs'
                        }
                        value2={
                          '₹' +
                          card2.minNetIncomeSelfEmployed.toString() +
                          ' Lakhs'
                        }
                        isCard1Better={
                          minNetIncomeSelfEmployedResult.isCard1Better
                        }
                        isCard2Better={
                          minNetIncomeSelfEmployedResult.isCard2Better
                        }
                      />
                    </ComparisonItemRow>
                  </ComparisonCard>

                  <ComparisonCard>
                    <ComparisonItemRowFullWidth
                      key={'points'}
                      value={'Points'}
                    />

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
                      <ComparisonItemHeadingCell
                        value={'Travel Points Per ₹100'}
                      />
                      <ComparisonItemContentBoth
                        value1={card1.travelPointsPer100.toString()}
                        value2={card2.travelPointsPer100.toString()}
                        isCard1Better={
                          card1.travelPointsPer100 > card2.travelPointsPer100
                        }
                        isCard2Better={
                          card2.travelPointsPer100 > card1.travelPointsPer100
                        }
                      />
                    </ComparisonItemRow>
                    <ComparisonItemRow key={'points-category-shopping'}>
                      <ComparisonItemHeadingCell
                        value={'Shopping Points Per ₹100'}
                      />
                      <ComparisonItemContentBoth
                        value1={card1.shoppingPointsPer100.toString()}
                        value2={card2.shoppingPointsPer100.toString()}
                        isCard1Better={
                          card1.shoppingPointsPer100 >
                          card2.shoppingPointsPer100
                        }
                        isCard2Better={
                          card2.shoppingPointsPer100 >
                          card1.shoppingPointsPer100
                        }
                      />
                    </ComparisonItemRow>
                    <ComparisonItemRow key={'points-category-dinning'}>
                      <ComparisonItemHeadingCell
                        value={'Dining Points Per ₹100'}
                      />
                      <ComparisonItemContentBoth
                        value1={card1.diningPointsPer100.toString()}
                        value2={card2.diningPointsPer100.toString()}
                        isCard1Better={
                          card1.diningPointsPer100 > card2.diningPointsPer100
                        }
                        isCard2Better={
                          card2.diningPointsPer100 > card1.diningPointsPer100
                        }
                      />
                    </ComparisonItemRow>
                    <ComparisonItemRow key={'points-category-fuel'}>
                      <ComparisonItemHeadingCell
                        value={'Fuel Points Per ₹100'}
                      />
                      <ComparisonItemContentBoth
                        value1={card1.fuelPointsPer100.toString()}
                        value2={card2.fuelPointsPer100.toString()}
                        isCard1Better={
                          card1.fuelPointsPer100 > card2.fuelPointsPer100
                        }
                        isCard2Better={
                          card2.fuelPointsPer100 > card1.fuelPointsPer100
                        }
                      />
                    </ComparisonItemRow>
                    <ComparisonItemRow key={'points-category-grocery'}>
                      <ComparisonItemHeadingCell
                        value={'Grocery Points Per ₹100'}
                      />
                      <ComparisonItemContentBoth
                        value1={card1.groceryPointsPer100.toString()}
                        value2={card2.groceryPointsPer100.toString()}
                        isCard1Better={
                          card1.groceryPointsPer100 > card2.groceryPointsPer100
                        }
                        isCard2Better={
                          card2.groceryPointsPer100 > card1.groceryPointsPer100
                        }
                      />
                    </ComparisonItemRow>
                    <ComparisonItemRow key={'points-category-utility'}>
                      <ComparisonItemHeadingCell
                        value={'Utility Points Per ₹100'}
                      />
                      <ComparisonItemContentBoth
                        value1={card1.utilityPointsPer100.toString()}
                        value2={card2.utilityPointsPer100.toString()}
                        isCard1Better={
                          card1.utilityPointsPer100 > card2.utilityPointsPer100
                        }
                        isCard2Better={
                          card2.utilityPointsPer100 > card1.utilityPointsPer100
                        }
                      />
                    </ComparisonItemRow>
                  </ComparisonCard>

                  <ComparisonCard>
                    <ComparisonItemRowFullWidth
                      // key={'fees'}
                      value={'Fees and Charges'}
                    />
                    {joiningFeeResult.show && (
                      <ComparisonItemRow
                      // key={'fees-1'}
                      >
                        <ComparisonItemHeadingCell value={'Joining Fee'} />
                        <ComparisonItemContentBoth
                          value1={'₹' + card1.joiningFee}
                          value2={'₹' + card2.joiningFee}
                          isCard1Better={card1.joiningFee < card2.joiningFee}
                          isCard2Better={card1.joiningFee > card2.joiningFee}
                        />
                      </ComparisonItemRow>
                    )}
                    {annualFeeResult.show && (
                      <ComparisonItemRow key={'annual-fee'}>
                        <ComparisonItemHeadingCell value={'Annual Fee'} />
                        <ComparisonItemContentBoth
                          value1={'₹' + card1.annualFee}
                          value2={'₹' + card2.annualFee}
                          isCard1Better={card1.annualFee < card2.annualFee}
                          isCard2Better={card1.annualFee > card2.annualFee}
                        />
                      </ComparisonItemRow>
                    )}
                    {minAmountForAnnualFeeWaiverResult.show && (
                      <ComparisonItemRow key={'annual-fee-waiver'}>
                        <ComparisonItemHeadingCell
                          value={'Minimum amount for Annual Fee waiver'}
                        />
                        <ComparisonItemContentBoth
                          value1={'₹' + card1.minAmountForAnnualFeeWaiver}
                          value2={'₹' + card2.minAmountForAnnualFeeWaiver}
                          isCard1Better={
                            minAmountForAnnualFeeWaiverResult.isCard1Better
                          }
                          isCard2Better={
                            minAmountForAnnualFeeWaiverResult.isCard2Better
                          }
                        />
                      </ComparisonItemRow>
                    )}
                    {signupBonusValueResult.show && (
                      <>
                        <ComparisonItemRow key={'signup Bonus'}>
                          <ComparisonItemHeadingCell
                            value={'Welcome/Signup Bonus'}
                          />
                          <ComparisonItemContentBoth
                            value1={
                              card1.signupBonus.length === 0
                                ? 'None'
                                : card1.signupBonus
                            }
                            value2={
                              card2.signupBonus.length === 0
                                ? 'None'
                                : card2.signupBonus
                            }
                            isCard1Better={signupBonusValueResult.isCard1Better}
                            isCard2Better={signupBonusValueResult.isCard2Better}
                          />
                        </ComparisonItemRow>
                        <ComparisonItemRow key={'signup Bonus Value'}>
                          <ComparisonItemHeadingCell value={'Bonus Value'} />
                          <ComparisonItemContentBoth
                            value1={'₹' + card1.signupBonusValue.toString()}
                            value2={'₹' + card2.signupBonusValue.toString()}
                            isCard1Better={signupBonusValueResult.isCard1Better}
                            isCard2Better={signupBonusValueResult.isCard2Better}
                          />
                        </ComparisonItemRow>
                      </>
                    )}
                    {signupBonusTermsResult.show && (
                      <ComparisonItemRow key={'signup Bonus'}>
                        <ComparisonItemHeadingCell
                          value={'Signup Bonus Terms'}
                        />
                        <ComparisonItemContentBoth
                          value1={card1.signupBonusTerms[0]}
                          value2={card2.signupBonusTerms[0]}
                          value1Array={card1.signupBonusTerms}
                          value2Array={card2.signupBonusTerms}
                          isCard1Better={signupBonusTermsResult.isCard1Better}
                          isCard2Better={signupBonusTermsResult.isCard2Better}
                        />
                      </ComparisonItemRow>
                    )}
                  </ComparisonCard>

                  <ComparisonCard>
                    <ComparisonItemRowFullWidth
                      key={'airport lounge access'}
                      value={'Airport Lounge Access'}
                    />
                    {(card1.domesticLounge > 0 || card2.domesticLounge > 0) && (
                      <ComparisonItemRow key={'airport-longue'}>
                        <ComparisonItemHeadingCell
                          value={'Available Domestic Lounge'}
                        />
                        <ComparisonItemContentBoth
                          value1={
                            card1.domesticLounge === 1000000000
                              ? 'Unlimited'
                              : card1.domesticLounge.toString()
                          }
                          value2={
                            card2.domesticLounge === 1000000000
                              ? 'Unlimited'
                              : card2.domesticLounge.toString()
                          }
                          isCard1Better={
                            card1.domesticLounge > card2.domesticLounge
                          }
                          isCard2Better={
                            card2.domesticLounge > card1.domesticLounge
                          }
                        />
                      </ComparisonItemRow>
                    )}
                    {(card1.internationalLounge > 0 ||
                      card2.internationalLounge > 0) && (
                      <ComparisonItemRow key={'airport-longue'}>
                        <ComparisonItemHeadingCell
                          value={'Available International Lounge'}
                        />
                        <ComparisonItemContentBoth
                          value1={
                            card1.internationalLounge === 1000000000
                              ? 'Unlimited'
                              : card1.internationalLounge.toString()
                          }
                          value2={
                            card2.internationalLounge === 1000000000
                              ? 'Unlimited'
                              : card2.internationalLounge.toString()
                          }
                          isCard1Better={
                            card1.internationalLounge >
                            card2.internationalLounge
                          }
                          isCard2Better={
                            card2.internationalLounge >
                            card1.internationalLounge
                          }
                        />
                      </ComparisonItemRow>
                    )}
                    {(card1.globalLounge > 0 || card2.globalLounge > 0) && (
                      <ComparisonItemRow key={'airport-longue'}>
                        <ComparisonItemHeadingCell
                          value={'Available Global Lounge'}
                        />
                        <ComparisonItemContentBoth
                          value1={
                            card1.globalLounge === 1000000000
                              ? 'Unlimited'
                              : card1.globalLounge.toString()
                          }
                          value2={
                            card2.globalLounge === 1000000000
                              ? 'Unlimited'
                              : card2.globalLounge.toString()
                          }
                          isCard1Better={
                            card1.globalLounge > card2.globalLounge
                          }
                          isCard2Better={
                            card2.globalLounge > card1.globalLounge
                          }
                        />
                      </ComparisonItemRow>
                    )}
                    {(card1.domesticGuestLounge > 0 ||
                      card2.domesticGuestLounge > 0) && (
                      <ComparisonItemRow key={'airport-longue-domestic-guest'}>
                        <ComparisonItemHeadingCell
                          value={'Available Domestic Lounge for Guest'}
                        />
                        <ComparisonItemContentBoth
                          value1={
                            card1.domesticGuestLounge === 1000000000
                              ? 'Unlimited'
                              : card1.domesticGuestLounge.toString()
                          }
                          value2={
                            card2.domesticGuestLounge === 1000000000
                              ? 'Unlimited'
                              : card2.domesticGuestLounge.toString()
                          }
                          isCard1Better={
                            card1.domesticGuestLounge >
                            card2.domesticGuestLounge
                          }
                          isCard2Better={
                            card2.domesticGuestLounge >
                            card1.domesticGuestLounge
                          }
                        />
                      </ComparisonItemRow>
                    )}
                    {(card1.internationalGuestLounge > 0 ||
                      card2.internationalGuestLounge > 0) && (
                      <ComparisonItemRow
                        key={'airport-longue-international-guest'}
                      >
                        <ComparisonItemHeadingCell
                          value={'Available International Lounge for Guest'}
                        />
                        <ComparisonItemContentBoth
                          value1={
                            card1.internationalGuestLounge === 1000000000
                              ? 'Unlimited'
                              : card1.internationalGuestLounge.toString()
                          }
                          value2={
                            card2.internationalGuestLounge === 1000000000
                              ? 'Unlimited'
                              : card2.internationalGuestLounge.toString()
                          }
                          isCard1Better={
                            card1.internationalGuestLounge >
                            card2.internationalGuestLounge
                          }
                          isCard2Better={
                            card2.internationalGuestLounge >
                            card1.internationalGuestLounge
                          }
                        />
                      </ComparisonItemRow>
                    )}
                    {(card1.globalGuestLounge > 0 ||
                      card2.globalGuestLounge > 0) && (
                      <ComparisonItemRow
                        key={'airport-longue-international-guest'}
                      >
                        <ComparisonItemHeadingCell
                          value={'Available Global Lounge for Guest'}
                        />
                        <ComparisonItemContentBoth
                          value1={
                            card1.globalGuestLounge === 1000000000
                              ? 'Unlimited'
                              : card1.globalGuestLounge.toString()
                          }
                          value2={
                            card2.globalGuestLounge === 1000000000
                              ? 'Unlimited'
                              : card2.globalGuestLounge.toString()
                          }
                          isCard1Better={
                            card1.globalGuestLounge > card2.globalGuestLounge
                          }
                          isCard2Better={
                            card2.globalGuestLounge > card1.globalGuestLounge
                          }
                        />
                      </ComparisonItemRow>
                    )}
                    {(card1.loungeAccessTerms.length > 0 ||
                      card2.loungeAccessTerms.length > 0) && (
                      <ComparisonItemRow key={'lounge-terms'}>
                        <ComparisonItemHeadingCell value={'Lounge Terms'} />
                        <ComparisonItemContentBoth
                          value1={card1.loungeAccessTerms[0]}
                          value2={card2.loungeAccessTerms[0]}
                          value1Array={card1.loungeAccessTerms}
                          value2Array={card2.loungeAccessTerms}
                          isCard1Better={
                            card1.globalGuestLounge > card2.globalGuestLounge
                          }
                          isCard2Better={
                            card2.globalGuestLounge > card1.globalGuestLounge
                          }
                        />
                      </ComparisonItemRow>
                    )}
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
                          value1={
                            HotelUtils.getTajMembershipData(card1.membershipTaj)
                              .name
                          }
                          value2={
                            HotelUtils.getTajMembershipData(card2.membershipTaj)
                              .name
                          }
                          isCard1Better={membershipTajResult.isCard1Better}
                          isCard2Better={membershipTajResult.isCard2Better}
                        />
                      </ComparisonItemRow>
                    )}
                    {membershipBonvoyResult.show && (
                      <ComparisonItemRow key={'hotels-2'}>
                        <ComparisonItemHeadingCell value={'Mariott Bonvoy'} />
                        <ComparisonItemContentBoth
                          value1={
                            HotelUtils.getBonvoyMembershipData(
                              card1.membershipBonvoy,
                            ).name
                          }
                          value2={
                            HotelUtils.getBonvoyMembershipData(
                              card2.membershipBonvoy,
                            ).name
                          }
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
                            HotelUtils.getHiltonHonorsMembershipData(
                              card1.membershipHiltonHonors,
                            ).name
                          }
                          value2={
                            HotelUtils.getHiltonHonorsMembershipData(
                              card2.membershipHiltonHonors,
                            ).name
                          }
                          isCard1Better={
                            membershipHiltonHonorsResult.isCard1Better
                          }
                          isCard2Better={
                            membershipHiltonHonorsResult.isCard2Better
                          }
                        />
                      </ComparisonItemRow>
                    )}
                    {membershipHotelRadissonResult.show && (
                      <ComparisonItemRow key={'hotels-4'}>
                        <ComparisonItemHeadingCell
                          value={'Radisson Membership'}
                        />
                        <ComparisonItemContentBoth
                          value1={
                            HotelUtils.getRadissonMembershipData(
                              card1.membershipHotelRadisson,
                            ).name
                          }
                          value2={
                            HotelUtils.getRadissonMembershipData(
                              card2.membershipHotelRadisson,
                            ).name
                          }
                          isCard1Better={
                            membershipHotelRadissonResult.isCard1Better
                          }
                          isCard2Better={
                            membershipHotelRadissonResult.isCard2Better
                          }
                        />
                      </ComparisonItemRow>
                    )}
                    {membershipAccorPlusResult.show && (
                      <ComparisonItemRow key={'hotels-5'}>
                        <ComparisonItemHeadingCell value={'Accor Plus'} />
                        <ComparisonItemContentBoth
                          value1={
                            HotelUtils.getAccorPlusMembershipData(
                              card1.membershipAccorPlus,
                            ).name
                          }
                          value2={
                            HotelUtils.getAccorPlusMembershipData(
                              card2.membershipAccorPlus,
                            ).name
                          }
                          isCard1Better={
                            membershipAccorPlusResult.isCard1Better
                          }
                          isCard2Better={
                            membershipAccorPlusResult.isCard2Better
                          }
                        />
                      </ComparisonItemRow>
                    )}
                    {membershipIPreferResult.show && (
                      <ComparisonItemRow key={'hotels-6'}>
                        <ComparisonItemHeadingCell
                          value={'IPrefer Hotel Rewards'}
                        />
                        <ComparisonItemContentBoth
                          value1={
                            HotelUtils.getIPreferMembershipData(
                              card1.membershipIPrefer,
                            ).name
                          }
                          value2={
                            HotelUtils.getIPreferMembershipData(
                              card2.membershipIPrefer,
                            ).name
                          }
                          isCard1Better={membershipIPreferResult.isCard1Better}
                          isCard2Better={membershipIPreferResult.isCard2Better}
                        />
                      </ComparisonItemRow>
                    )}
                    {membershipPostcardSunshineClubResult.show && (
                      <ComparisonItemRow key={'hotels-7'}>
                        <ComparisonItemHeadingCell
                          value={'Sunchine Club Membership'}
                        />
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
                          isCard1Better={
                            membershipPostcardSunshineClubResult.isCard1Better
                          }
                          isCard2Better={
                            membershipPostcardSunshineClubResult.isCard2Better
                          }
                        />
                      </ComparisonItemRow>
                    )}
                  </ComparisonCard>

                  <ComparisonCard>
                    <ComparisonItemRowFullWidth
                      key={'Intro-Offers'}
                      value={'Offers'}
                    />

                    <ComparisonItemRow key={'intro-offers-1'}>
                      <ComparisonItemHeadingCell value={'Perks'} />
                      <ComparisonItemContentBoth
                        value1={card1.perks[0]}
                        value2={card2.perks[0]}
                        value1Array={card1.perks}
                        value2Array={card2.perks}
                        isCard1Better={introductoryOffersResult.isCard1Better}
                        isCard2Better={introductoryOffersResult.isCard2Better}
                      />
                    </ComparisonItemRow>

                    {introductoryOffersResult.show && (
                      <ComparisonItemRow key={'intro-offers-2'}>
                        <ComparisonItemHeadingCell
                          value={'Introductory Offers'}
                        />
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
                        className="py-4"
                        style={{ maxWidth: '150px' }}
                      >
                        <Link
                          href={card1.affiliateUrl}
                          className="rounded-md bg-indigo-600 px-3 py-1 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Apply
                        </Link>
                      </td>
                      <td
                        key="23"
                        className="py-4"
                        // className="whitespace-normal break-words px-3 py-4 text-sm text-gray-500 sm:whitespace-nowrap sm:truncate"
                        style={{ maxWidth: '150px' }}
                      >
                        <Link
                          href={card1.affiliateUrl}
                          className="rounded-md bg-indigo-600 px-3 py-1 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Apply
                        </Link>
                      </td>
                    </ComparisonItemRow>
                  </ComparisonCard>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="mt-8">
            <h2 className="text-3xl font-semibold text-gray-900">
              Related Comparison
            </h2>
            {/* <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
              Personal details and application.
            </p> */}
          </div>
          <div className="mt-6 border-t border-gray-100 font-semibold">
            <ol className="list-decimal">
              {recentCreditCards.map(
                (card) =>
                  card.id !== card1.id && (
                    <li key={card.id} className="py-1">
                      <Link
                        href={`/credit-card-compare/${card1.slug}-vs-${card.slug}`}
                      >
                        <div className="flex items-center justify-between space-x-4">
                          <div className="min-w-0 flex-1">
                            <div className="text-sm/6 font-semibold text-gray-800">
                              {card1.name} vs {card.name}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ),
              )}
            </ol>
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

export async function generateMetadata({
  params: paramsPromise,
}: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const url = '/credit-card-compare/' + slug

  // if slug contains vs
  const isValidCompareSlug = slug.includes('vs')
  if (!isValidCompareSlug) {
    return notFound()
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
    return notFound()
  }
  const card1 = creditCards[0]
  const card2 = creditCards[1]

  const possibleSlug = [
    `${card1.slug}-vs-${card2.slug}`,
    `${card2.slug}-vs-${card1.slug}`,
  ]
  const comparisonSlug = await db.comparisonSlug.findFirst({
    where: {
      slug: {
        in: possibleSlug,
      },
    },
  })

  return {
    title: `${creditCards[0].name} vs ${creditCards[1].name}: Which is better| CS`,
    description: `Discover how ${card1.name} and ${card2.name} stack up against each other in terms of cashback, annual fees, and exclusive perks. Make an informed choice for your wallet with our detailed comparison.`,
    authors: {
      name: `Rishabh Chauhan`,
      // url: `${env.NEXT_PUBLIC_BASE_URL}/artist/${product.user.username}`,
    },
    alternates: {
      canonical: `${env.NEXT_PUBLIC_BASE_URL}/credit-card-compare/${comparisonSlug?.slug}`,
    },
    keywords: [
      `${card1.name} vs ${card2.name}`,
      ...creditCards[0].tags,
      ...creditCards[1].tags,
    ],
    publisher: process.env.siteName,
    openGraph: {
      type: 'website',
      title: `${creditCards[0].name} vs ${creditCards[1].name}: Which is better| CS`,
      description: `Discover how ${card1.name} and ${card2.name} stack up against each other in terms of cashback, annual fees, and exclusive perks.`,
      countryName: process.env.seoBaseCountry,
      url: `${env.NEXT_PUBLIC_BASE_URL}/credit-card-compare/${comparisonSlug?.slug}`,
      images: [
        {
          url: card1.imageUrl,
        },
      ],
      siteName: `CardSwami.com`,
    },
  }
}

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

const ComparisonItemRowFullWidth = ({ value }: { value: String }) => {
  return (
    <tr className="border-t border-gray-200">
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
const ComparisonItemRow = ({ children }: { children: React.ReactNode }) => {
  return <tr className="border-t border-gray-200">{children}</tr>
}
const ComparisonItemHeadingCell = ({ value }: { value: String }) => {
  return <td className="text-md font-medium text-gray-900 sm:pl-3">{value}</td>
}
const ComparisonItemContentBoth = ({
  value1,
  value2,
  value1Array,
  value2Array,
  isCard1Better,
  isCard2Better,
}: {
  value1: String
  value2: String
  value1Array?: String[]
  value2Array?: String[]
  isCard1Better: Boolean
  isCard2Better: Boolean
}) => {
  const card1Formatting = isCard1Better ? 'bg-green-200' : ''
  const card2Formatting = isCard2Better ? 'bg-green-200' : ''
  return (
    <>
      <td
        key=""
        className={'px-3 py-4 text-sm text-gray-500 ' + card1Formatting}
        style={{ maxWidth: '120px' }}
      >
        {value1Array && value1Array.length > 1 ? (
          <ul className="list-disc">
            {value1Array.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          value1
        )}
      </td>
      <td
        key="23"
        className={'px-3 py-4 text-sm text-gray-500 ' + card2Formatting}
        style={{ maxWidth: '120px' }}
      >
        {value2Array && value2Array.length > 1 ? (
          <ul className="list-disc">
            {value2Array.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          value2
        )}
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
