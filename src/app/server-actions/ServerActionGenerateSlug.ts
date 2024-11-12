'use server'

import { db } from '@/db/prismaDb'

export async function ServerActionGenerateSlug() {
  const creditcards = await db.creditCard.findMany({
    // where: {
    //   isDeleted: false,
    // },
  })
  console.log({ creditcards })

  let slugSet = new Set()
  const comparisonSlugs = await db.comparisonSlug.findMany({})
  console.log({ comparisonSlugs })

  // if (comparisonSlugs && comparisonSlugs.length > 0) {
  //   comparisonSlugs.forEach((slug) => {
  //     slugSet.add(slug.slug)
  //   })
  // }

  // creditcards.forEach((card1) => {
  //   creditcards.forEach(async (card2) => {
  //     if (card1.id === card2.id) {
  //       return
  //     }
  //     const slug1 = `${card1.slug}-vs-${card2.slug}`
  //     const slug2 = `${card2.slug}-vs-${card1.slug}`

  //     if (slugSet.has(slug1) || slugSet.has(slug2)) {
  //       return
  //     }

  //     slugSet.add(slug1)
  //     await db.comparisonSlug.create({
  //       data: {
  //         slug: slug1,
  //         name: `${card1.name} vs ${card2.name}`,
  //         card1ImageUrl: card1.imageUrl,
  //         card2ImageUrl: card2.imageUrl,
  //       },
  //     })
  //   })
  // })

  comparisonSlugs.forEach(async (comparisonSlug) => {
    comparisonSlug.card1ImageUrl = creditcards.find(
      (card) => card.slug === comparisonSlug.slug.split('-vs-')[0],
    )?.imageUrl!
    comparisonSlug.card2ImageUrl = creditcards.find(
      (card) => card.slug === comparisonSlug.slug.split('-vs-')[1],
    )?.imageUrl!
    console.log({ comparisonSlug })
    await db.comparisonSlug.update({
      where: {
        comparisonSlugId: comparisonSlug.comparisonSlugId,
      },
      data: {
        card1ImageUrl: comparisonSlug.card1ImageUrl,
        card2ImageUrl: comparisonSlug.card2ImageUrl,
      },
    })
  })
}
