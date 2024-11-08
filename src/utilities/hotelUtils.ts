import {
  MembershipAccorPlus,
  MembershipBonvoy,
  MembershipHiltonHonors,
  MembershipHotelRadisson,
  MembershipIPrefer,
  MembershipPostcardSunshineClub,
  MembershipTajEpicure,
} from '@prisma/client'

type MembershipData = {
  level: number
  name: string
  cost: number
  costUnit: string
}

export class HotelUtils {
  static getTajMembershipData(membershipData: MembershipTajEpicure): MembershipData {
    switch (membershipData) {
      case MembershipTajEpicure.NONE:
        return { level: 0, name: 'None', cost: 0, costUnit: 'INR' }
      case MembershipTajEpicure.PREFFERED:
        return { level: 1, name: 'Epicure Preferred', cost: 25000, costUnit: 'INR' }
      case MembershipTajEpicure.PRIVILEGED:
        return { level: 2, name: 'Epicure Privileged', cost: 50000, costUnit: 'INR' }
    }
  }

  static getBonvoyMembershipData(membershipData: MembershipBonvoy): MembershipData {
    switch (membershipData) {
      case MembershipBonvoy.NONE:
        return { level: 0, name: 'None', cost: 0, costUnit: 'nights per year' }
      case MembershipBonvoy.SILVER_ELITE:
        return { level: 1, name: 'Silver Elite', cost: 10, costUnit: 'nights per year' }
      case MembershipBonvoy.GOLD_ELITE:
        return { level: 2, name: 'Gold Elite', cost: 25, costUnit: 'nights per year' }
      case MembershipBonvoy.PLATINUM_ELITE:
        return { level: 3, name: 'Platinum Elite', cost: 50, costUnit: 'nights per year' }
      case MembershipBonvoy.TITANIUM_ELITE:
        return { level: 4, name: 'Titanium Elite', cost: 75, costUnit: 'nights per year' }
      case MembershipBonvoy.AMBASSADOR_ELITE:
        return { level: 5, name: 'Ambassador Elite', cost: 100, costUnit: 'nights per year' }
    }
  }

  static getRadissonMembershipData(membershipData: MembershipHotelRadisson): MembershipData {
    switch (membershipData) {
      case MembershipHotelRadisson.NONE:
        return { level: 0, name: 'None', cost: 0, costUnit: 'INR' }
      case MembershipHotelRadisson.CLUB:
        return { level: 1, name: 'Club', cost: 0, costUnit: '' }
      case MembershipHotelRadisson.PREMIUM:
        return { level: 2, name: 'Premium', cost: 5, costUnit: 'nights' }
      case MembershipHotelRadisson.VIP:
        return { level: 3, name: 'VIP', cost: 30, costUnit: 'nights' }
    }
  }

  static getSunshineClubMembershipData(
    membershipData: MembershipPostcardSunshineClub,
  ): MembershipData {
    switch (membershipData) {
      case MembershipPostcardSunshineClub.NONE:
        return { level: 0, name: 'None', cost: 0, costUnit: 'INR' }
      case MembershipPostcardSunshineClub.GOLD:
        return { level: 1, name: 'Gold', cost: 0, costUnit: '' }
      case MembershipPostcardSunshineClub.PLATINUM:
        return { level: 2, name: 'Platinum', cost: 15, costUnit: 'nights' }
      case MembershipPostcardSunshineClub.BLACK:
        return { level: 3, name: 'Black', cost: 25, costUnit: 'nights' }
    }
  }

  static getIPreferMembershipData(membershipData: MembershipIPrefer): MembershipData {
    switch (membershipData) {
      case MembershipIPrefer.NONE:
        return { level: 0, name: 'None', cost: 0, costUnit: 'INR' }
      case MembershipIPrefer.SILVER:
        return { level: 1, name: 'Silver', cost: 0, costUnit: 'points' }
      case MembershipIPrefer.GOLD:
        return { level: 2, name: 'Gold', cost: 25000, costUnit: 'points' }
      case MembershipIPrefer.TITANIUM:
        return { level: 3, name: 'Titanium', cost: 50000, costUnit: 'points' }
    }
  }

  static getAccorPlusMembershipData(membershipData: MembershipAccorPlus): MembershipData {
    switch (membershipData) {
      case MembershipAccorPlus.NONE:
        return { level: 0, name: 'None', cost: 0, costUnit: 'INR' }
      case MembershipAccorPlus.TRAVELLER:
        return { level: 1, name: 'Traveller', cost: 11800, costUnit: 'INR' }
      case MembershipAccorPlus.EXPLORER:
        return { level: 2, name: 'Explorer', cost: 16550, costUnit: 'INR' }
    }
  }

  static getHiltonHonorsMembershipData(membershipData: MembershipHiltonHonors): MembershipData {
    switch (membershipData) {
      case MembershipHiltonHonors.NONE:
        return { level: 0, name: 'None', cost: 0, costUnit: 'INR' }
      case MembershipHiltonHonors.MEMBER:
        return { level: 1, name: 'Member', cost: 0, costUnit: 'nights' }
      case MembershipHiltonHonors.SILVER:
        return { level: 2, name: 'Silver', cost: 10, costUnit: 'nights' }
      case MembershipHiltonHonors.GOLD:
        return { level: 3, name: 'Gold', cost: 40, costUnit: 'nights' }
      case MembershipHiltonHonors.DIAMOND:
        return { level: 4, name: 'Diamond', cost: 60, costUnit: 'nights' }
    }
  }
}
