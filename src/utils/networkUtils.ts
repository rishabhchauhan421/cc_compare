import { NetworkBrand } from '@prisma/client'

type NetworkData = {
  name: string
  slug: string
}

export class NetworkUtils {
  static getNetworkDetails(network: NetworkBrand): NetworkData {
    switch (network) {
      case NetworkBrand.VISA:
        return { name: 'VISA', slug: '/visa' }
      case NetworkBrand.RUPAY:
        return {
          name: 'RUPAY',
          slug: '/rupay',
        }
      case NetworkBrand.MASTERCARD:
        return {
          name: 'MASTERCARD',
          slug: '/mastercard',
        }
      case NetworkBrand.AMEX:
        return {
          name: 'American Express',
          slug: '/amex',
        }
      default:
        return { name: '', slug: '' }
    }
  }
}
