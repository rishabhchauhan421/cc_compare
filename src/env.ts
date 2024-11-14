import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    DATABASE_URI: z.string().url(),
    NODE_ENV: z.enum(['development', 'test', 'production']),

    // Auth Constraints
    // NEXTAUTH_SECRET: z.string().min(1),
    // NEXTAUTH_URL: z.string().url(),
    // GOOGLE_CLIENT_ID: z.string().min(1),
    // GOOGLE_CLIENT_SECRET: z.string().min(1),
    // JWT_SECRET: z.string().min(1),

    // AWS S3 Credentials
    // AWS_S3_REGION: z.string().min(1),
    // AWS_ACCESS_KEY_ID: z.string().min(1),
    // AWS_S3_SECRET_KEY: z.string().min(1),

    // // AWS S3 Upload Constraints
    // UPLOADING_TIME_LIMIT: z.coerce.number().min(1),
    // UPLOAD_MAX_FILE_SIZE: z.coerce.number().min(1),

    // // Razorpay Credentials
    // RAZORPAY_ID: z.string().min(1),
    // RAZORPAY_SECRET: z.string().min(1),

    // // Upstash Redit Rest API Credentials for rate limiting
    // UPSTASH_REDIS_REST_URL: z.string().url(),
    // UPSTASH_REDIS_REST_TOKEN: z.string().min(1),

    // //Default Product Constraints
    // DEFAULT_PRODUCT_PRICE: z.coerce.number().min(1),

    // //Email Constraints
    // ZOHO_HOST: z.string().min(1),
    // ZOHO_NOREPLY_EMAIL: z.string().email(),
    // ZOHO_NOREPLY_PASSWORD: z.string().min(1),
    // RESEND_API_KEY: z.string().min(1),

    // Google Site Verification
    // googleSiteVerification: z.string().min(1),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_BASE_URL: z.string().url(),
    // NEXT_PUBLIC_ANNOUNCEMENT: z.string().min(1).max(49),
    // NEXT_PUBLIC_MINIMUM_CART_VALUE_FOR_FREE_SHIPPING: z.coerce.number().min(0),
    // NEXT_PUBLIC_MINIMUM_CART_VALUE_FOR_COD: z.coerce.number().min(0),
    // NEXT_PUBLIC_COD_COST: z.coerce.number().min(0),
    // NEXT_PUBLIC_ONLINE_PAYMENT_DISCOUNT: z.coerce.number().min(0),
    // NEXT_PUBLIC_SHIPPING_COST:z.coerce.number(),
    // NEXT_PUBLIC_RAZORPAY_ID: z.string().min(1),
    // NEXT_PUBLIC_TRPC_HTTP_URL: z.string().url(),
    // NEXT_PUBLIC_AWS_S3_BUCKET_NAME: z.string().min(1),
    NEXT_PUBLIC_GOOGLE_TAG: z.string().min(1),

    // next.config.js variables
    NEXT_PUBLIC_siteName: z.string().min(1),
    // NEXT_PUBLIC_siteNameCamelCase: z.string().min(1),
    // NEXT_PUBLIC_siteNameCapitalCase: z.string().min(1),
    // NEXT_PUBLIC_OpenGraphSiteName: z.string().min(1),
    // NEXT_PUBLIC_domain: z.string().min(1),
    // NEXT_PUBLIC_homePageTitle: z.string().min(1),
    // NEXT_PUBLIC_seoSiteBannerImage: z.string().min(1),
    // NEXT_PUBLIC_seoProductNotFoundTitleTitle: z.string().min(1),
    // NEXT_PUBLIC_seoProductNotFoundDescription: z.string().min(1),
    NEXT_PUBLIC_seoBaseCountry: z.string().min(1),
    NEXT_PUBLIC_seoRegion: z.string().min(1),
    // NEXT_PUBLIC_pageTitleSuffix: z.string().min(1),
    // NEXT_PUBLIC_siteDescription: z.string().min(1),
    NEXT_PUBLIC_seoSiteDescription: z.string().min(1),
    // NEXT_PUBLIC_seoSiteDescriptionSuffix: z.string().min(1),
    // NEXT_PUBLIC_creator: z.string().min(1),
    NEXT_PUBLIC_supportEmail: z.string().min(1),
    // NEXT_PUBLIC_artistSupportEmail: z.string().min(1),
    // NEXT_PUBLIC_defaultProductPrice: z.string().min(1),
    // NEXT_PUBLIC_instagramUrl: z.string().min(1),
    // NEXT_PUBLIC_facebookUrl: z.string().min(1),
    // NEXT_PUBLIC_twitterUrl: z.string().min(1),
    // NEXT_PUBLIC_pinterestUrl: z.string().min(1),
    // NEXT_PUBLIC_linkedinUrl: z.string().min(1),
    // NEXT_PUBLIC_youtubeUrl: z.string().min(1),
    // NEXT_PUBLIC_UPLOAD_MAX_FILE_SIZE: z.coerce.number(),
    // NEXT_PUBLIC_UPLOAD_MAX_AVATAR_IMAGE_FILE_SIZE: z.coerce.number(),
    // NEXT_PUBLIC_MIN_FRONT_IMAGES_PER_COLOR:z.coerce.number(),
    // NEXT_PUBLIC_MIN_BACK_IMAGES_PER_COLOR:z.coerce.number(),
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    //from env.ts file
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_GOOGLE_TAG: process.env.NEXT_PUBLIC_GOOGLE_TAG,
    // From .env file
    DATABASE_URI: process.env.DATABASE_URI,
    // NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    // NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    // GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    // GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    // JWT_SECRET: process.env.JWT_SECRET,

    // SHIPPING_COST: process.env.SHIPPING_COST,
    // NEXT_PUBLIC_COD_COST: process.env.NEXT_PUBLIC_COD_COST,
    // NEXT_PUBLIC_ONLINE_PAYMENT_DISCOUNT: process.env.NEXT_PUBLIC_ONLINE_PAYMENT_DISCOUNT,
    // NEXT_PUBLIC_MINIMUM_CART_VALUE_FOR_COD: process.env.NEXT_PUBLIC_MINIMUM_CART_VALUE_FOR_COD,
    // ONLINE_PAYMENT_DISCOUNT: process.env.ONLINE_PAYMENT_DISCOUNT,
    // AWS_S3_REGION: process.env.AWS_S3_REGION,
    // AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    // AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY,
    // UPLOADING_TIME_LIMIT: process.env.UPLOADING_TIME_LIMIT,
    // UPLOAD_MAX_FILE_SIZE: process.env.UPLOAD_MAX_FILE_SIZE,
    // PRODUCT_CATEGORY_LIST_REVALIDATE_TIME: process.env.PRODUCT_CATEGORY_LIST_REVALIDATE_TIME,
    // RAZORPAY_ID: process.env.RAZORPAY_ID,
    // RAZORPAY_SECRET: process.env.RAZORPAY_SECRET,
    // UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    // UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    // googleSiteVerification: process.env.googleSiteVerification,
    // DEFAULT_PRODUCT_PRICE: process.env.DEFAULT_PRODUCT_PRICE,
    // ZOHO_HOST: process.env.ZOHO_HOST,
    // ZOHO_NOREPLY_EMAIL: process.env.ZOHO_NOREPLY_EMAIL,
    // ZOHO_NOREPLY_PASSWORD: process.env.ZOHO_NOREPLY_PASSWORD,
    // RESEND_API_KEY: process.env.RESEND_API_KEY,

    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    // NEXT_PUBLIC_ANNOUNCEMENT: process.env.NEXT_PUBLIC_ANNOUNCEMENT,
    // NEXT_PUBLIC_MINIMUM_CART_VALUE_FOR_FREE_SHIPPING:
    // process.env.NEXT_PUBLIC_MINIMUM_CART_VALUE_FOR_FREE_SHIPPING,
    // NEXT_PUBLIC_RAZORPAY_ID: process.env.NEXT_PUBLIC_RAZORPAY_ID,
    // NEXT_PUBLIC_TRPC_HTTP_URL: process.env.NEXT_PUBLIC_TRPC_HTTP_URL,
    // NEXT_PUBLIC_AWS_S3_BUCKET_NAME: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
    // NEXT_PUBLIC_UPLOAD_MAX_FILE_SIZE: process.env.NEXT_PUBLIC_UPLOAD_MAX_FILE_SIZE,
    // NEXT_PUBLIC_UPLOAD_MAX_AVATAR_IMAGE_FILE_SIZE: process.env.NEXT_PUBLIC_UPLOAD_MAX_AVATAR_IMAGE_FILE_SIZE,
    // NEXT_PUBLIC_SHIPPING_COST: process.env.NEXT_PUBLIC_SHIPPING_COST,

    // // From next.config.js
    NEXT_PUBLIC_siteName: process.env.siteName,
    //     NEXT_PUBLIC_siteNameCamelCase: process.env.siteNameCamelCase,
    //     NEXT_PUBLIC_siteNameCapitalCase: process.env.siteNameCapitalCase,
    //     NEXT_PUBLIC_OpenGraphSiteName: process.env.OpenGraphSiteName,
    //     NEXT_PUBLIC_domain: process.env.domain,
    //     NEXT_PUBLIC_homePageTitle: process.env.homePageTitle,
    //     NEXT_PUBLIC_seoSiteBannerImage: process.env.seoSiteBannerImage,
    //     NEXT_PUBLIC_seoProductNotFoundTitleTitle: process.env.seoProductNotFoundTitleTitle,
    //     NEXT_PUBLIC_seoProductNotFoundDescription: process.env.seoProductNotFoundDescription,
    NEXT_PUBLIC_seoBaseCountry: process.env.seoBaseCountry,
    NEXT_PUBLIC_seoRegion: process.env.seoRegion,
    //     NEXT_PUBLIC_pageTitleSuffix: process.env.pageTitleSuffix,
    //     NEXT_PUBLIC_siteDescription: process.env.siteDescription,
    NEXT_PUBLIC_seoSiteDescription: process.env.seoSiteDescription,
    //     NEXT_PUBLIC_seoSiteDescriptionSuffix: process.env.seoSiteDescriptionSuffix,
    //     NEXT_PUBLIC_creator: process.env.creator,
    NEXT_PUBLIC_supportEmail: process.env.supportEmail,
    //     NEXT_PUBLIC_artistSupportEmail: process.env.artistSupportEmail,
    //     NEXT_PUBLIC_defaultProductPrice: process.env.defaultProductPrice,
    //     NEXT_PUBLIC_instagramUrl: process.env.instagramUrl,
    //     NEXT_PUBLIC_facebookUrl: process.env.facebookUrl,
    //     NEXT_PUBLIC_twitterUrl: process.env.twitterUrl,
    //     NEXT_PUBLIC_pinterestUrl: process.env.pinterestUrl,
    //     NEXT_PUBLIC_linkedinUrl: process.env.linkedinUrl,
    //     NEXT_PUBLIC_youtubeUrl: process.env.youtubeUrl,

    // NEXT_PUBLIC_MIN_BACK_IMAGES_PER_COLOR:process.env.NEXT_PUBLIC_MIN_BACK_IMAGES_PER_COLOR,
    // NEXT_PUBLIC_MIN_FRONT_IMAGES_PER_COLOR:process.env.NEXT_PUBLIC_MIN_FRONT_IMAGES_PER_COLOR,
  },
})
