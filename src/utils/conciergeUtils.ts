import { Concierge } from '@prisma/client'

type ConciergeData = {
  level: number
  name: string
}

export class ConciergeUtils {
  static getConciergeData(concierge: Concierge): ConciergeData {
    switch (concierge) {
      case Concierge.NONE:
        return { level: 0, name: 'None' }
      case Concierge.DOMESTIC:
        return {
          level: 1,
          name: 'Domestic',
        }
      case Concierge.GLOBAL:
        return {
          level: 1,
          name: 'Global',
        }
      case Concierge.BOTH:
        return {
          level: 2,
          name: 'Domestic & Global',
        }
    }
  }
}
