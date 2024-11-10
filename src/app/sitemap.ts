export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL

  //Get All products from DB
  // const creditcards = await db.creditCard.findMany({
  //   where: {
  //     isDeleted: false,
  //   },
  // })
  // const creditCardUrls =
  //   creditcards.map((creditCard) => {
  //     return {
  //       url: baseUrl + `/${creditCard.slug}/cc/${creditCard.id}`,
  //       lastModified: creditCard.updatedAt,
  //     }
  //   }) ?? []

  // ];
  // const comparisonSlug = await db.comparisonSlug.findMany({})
  // const comparisonUrls =
  //   comparisonSlug.map((comparison) => {
  //     return {
  //       url: baseUrl + `/credit-card-compare/${comparison.slug}`,
  //       lastModified: comparison.updatedAt,
  //     }
  //   }) ?? []

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    // ...creditCardUrls,
    // ...comparisonUrls,
    // {
    //   url: `${baseUrl}/about-us`,
    //   lastModified: new Date(),
    // },
    // {
    //   url: `${baseUrl}/contact-us`,
    //   lastModified: new Date(),
    // },
    // {
    //   url: `${baseUrl}/copyright`,
    //   lastModified: new Date(),
    // },
    // {
    //   url: `${baseUrl}/faq`,
    //   lastModified: new Date(),
    // },
    // {
    //   url: `${baseUrl}/privacy-policy`,
    //   lastModified: new Date(),
    // },
    // {
    //   url: `${baseUrl}/shipping`,
    //   lastModified: new Date(),
    // },
    // {
    //   url: `${baseUrl}/terms-of-use`,
    //   lastModified: new Date(),
    // },
    // {
    //   url: `${baseUrl}/login`,
    //   lastModified: new Date(),
    // },
    // {
    //   url: `${baseUrl}/register`,
    //   lastModified: new Date(),
    // },

    // ...collectionUrls,
  ]
}
