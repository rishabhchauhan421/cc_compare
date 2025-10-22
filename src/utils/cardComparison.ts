import { CardMaterial, Concierge, type CreditCard } from '@prisma/client';
import { ConciergeUtils } from './conciergeUtils';
import { HotelUtils } from './hotelUtils';

export enum CreditCardAttributes {
  isInviteOnly,
  cardMaterial,
  concierge,
  minAgeSalaried,
  minAgeSelfEmployed,
  minNetIncomeSalaried,
  maxAgeSalaried,
  maxAgeSelfEmployed,
  minNetIncomeSelfEmployed,

  joiningFee,
  annualFee,
  minAmountForAnnualFeeWaiver,
  signupBonus,
  signupBonusValue,
  signupBonusTerms,

  pointValue,
  allPointsPer100Spent,
  travelPointsPer100Spent,
  shoppingPointsPer100Spent,
  diningPointsPer100Spent,
  fuelPointsPer100Spent,
  groceryPointsPer100Spent,
  utilityPointsPer100Spent,
  insurancePointsPer100Spent,
  governmentTaxPointsPer100Spent,
  rentPointsPer100Spent,
  emiPointsPer100Spent,
  pointsConversion,

  domesticLounge,
  internationalLounge,
  globalLounge,
  domesticGuestLounge,
  internationalGuestLounge,
  globalGuestLounge,

  airportConcierge,

  domesticGolfGamesPerQuater,
  internationalGolfGamesPerQuater,

  membershipTaj,
  membershipBonvoy,
  membershipHiltonHonors,
  membershipHotelRadisson,
  membershipAccorPlus,
  membershipPostcardSunshineClub,
  membershipIPrefer,

  introductoryOffers,
  membership,
}

type ComparisonResult = {
  show: boolean;
  isCard1Better: boolean;
  isCard2Better: boolean;
};

export class CardComparison {
  static compareCards({
    card1,
    card2,
    attr,
  }: {
    card1: CreditCard;
    card2: CreditCard;
    attr: CreditCardAttributes;
  }): ComparisonResult {
    switch (attr) {
      // Compare the isInviteOnly attribute of the two cards
      case CreditCardAttributes.isInviteOnly:
        if (card2.id == 'blank') {
          return { show: true, isCard1Better: false, isCard2Better: false };
        } else if (card1.isInviteOnly && !card2.isInviteOnly) {
          return { show: true, isCard1Better: true, isCard2Better: false };
        } else if (!card1.isInviteOnly && card2.isInviteOnly) {
          return { show: true, isCard1Better: false, isCard2Better: true };
        } else {
          return { show: true, isCard1Better: false, isCard2Better: false };
        }

      case CreditCardAttributes.cardMaterial:
        if (card2.id == 'blank') {
          return { show: true, isCard1Better: false, isCard2Better: false };
        } else if (card1.cardMaterial === card2.cardMaterial) {
          return { show: true, isCard1Better: false, isCard2Better: false };
        } else if (card1.cardMaterial === CardMaterial.METAL) {
          return { show: true, isCard1Better: true, isCard2Better: false };
        } else if (card2.cardMaterial === CardMaterial.METAL) {
          return { show: true, isCard1Better: false, isCard2Better: true };
        } else if (card1.cardMaterial === CardMaterial.PLASTIC) {
          return { show: true, isCard1Better: true, isCard2Better: false };
        } else if (card2.cardMaterial === CardMaterial.PLASTIC) {
          return { show: true, isCard1Better: false, isCard2Better: true };
        } else {
          return { show: false, isCard1Better: false, isCard2Better: false };
        }

      case CreditCardAttributes.concierge:
        if (card2.id == 'blank') {
          return { show: true, isCard1Better: false, isCard2Better: false };
        }

        const card1Data = ConciergeUtils.getConciergeData(card1.concierge);
        const card2Data = ConciergeUtils.getConciergeData(card2.concierge);
        if (
          card1.concierge === Concierge.NONE &&
          card2.concierge === Concierge.NONE
        )
          return { show: false, isCard1Better: false, isCard2Better: false };
        else if (card1Data.level === card2Data.level) {
          return { show: true, isCard1Better: false, isCard2Better: false };
        } else {
          return {
            show: true,
            isCard1Better: card1Data.level > card2Data.level,
            isCard2Better: card2Data.level > card1Data.level,
          };
        }

      case CreditCardAttributes.minAgeSalaried:
        if (card2.id == 'blank') {
          return { show: true, isCard1Better: false, isCard2Better: false };
        } else if (card1.minAgeSalaried < card2.minAgeSalaried) {
          return { show: true, isCard1Better: true, isCard2Better: false };
        } else if (card1.minAgeSalaried > card2.minAgeSalaried) {
          return { show: true, isCard1Better: false, isCard2Better: true };
        }
        return { show: true, isCard1Better: false, isCard2Better: false };

      case CreditCardAttributes.maxAgeSalaried:
        if (card2.id == 'blank') {
          return { show: true, isCard1Better: false, isCard2Better: false };
        } else if (card1.maxAgeSalaried > card2.maxAgeSalaried) {
          return { show: true, isCard1Better: true, isCard2Better: false };
        } else if (card1.maxAgeSalaried < card2.maxAgeSalaried) {
          return { show: true, isCard1Better: false, isCard2Better: true };
        }
        return { show: true, isCard1Better: false, isCard2Better: false };

      case CreditCardAttributes.minNetIncomeSalaried:
        if (card2.id == 'blank') {
          return { show: true, isCard1Better: false, isCard2Better: false };
        } else if (card1.minNetIncomeSalaried === card2.minNetIncomeSalaried) {
          return { show: true, isCard1Better: false, isCard2Better: false };
        } else if (card1.minNetIncomeSalaried < card2.minNetIncomeSalaried) {
          return { show: true, isCard1Better: true, isCard2Better: false };
        } else if (card1.minNetIncomeSalaried > card2.minNetIncomeSalaried) {
          return { show: true, isCard1Better: false, isCard2Better: true };
        }
        return { show: true, isCard1Better: false, isCard2Better: false };

      case CreditCardAttributes.minAgeSelfEmployed:
        if (card2.id == 'blank') {
          return { show: true, isCard1Better: false, isCard2Better: false };
        } else if (card1.minAgeSelfEmployed < card2.minAgeSelfEmployed) {
          return { show: true, isCard1Better: true, isCard2Better: false };
        } else if (card1.minAgeSelfEmployed > card2.minAgeSelfEmployed) {
          return { show: true, isCard1Better: false, isCard2Better: true };
        }
        return { show: true, isCard1Better: false, isCard2Better: false };

      case CreditCardAttributes.maxAgeSelfEmployed:
        if (card2.id == 'blank') {
          return { show: true, isCard1Better: false, isCard2Better: false };
        } else if (card1.maxAgeSelfEmployed > card2.maxAgeSelfEmployed) {
          return { show: true, isCard1Better: true, isCard2Better: false };
        } else if (card1.maxAgeSelfEmployed < card2.maxAgeSelfEmployed) {
          return { show: true, isCard1Better: false, isCard2Better: true };
        }
        return { show: true, isCard1Better: false, isCard2Better: false };

      case CreditCardAttributes.minNetIncomeSelfEmployed:
        if (card2.id == 'blank') {
          return { show: true, isCard1Better: false, isCard2Better: false };
        } else if (
          card1.minNetIncomeSelfEmployed === card2.minNetIncomeSelfEmployed
        ) {
          return { show: true, isCard1Better: false, isCard2Better: false };
        } else if (
          card1.minNetIncomeSelfEmployed < card2.minNetIncomeSelfEmployed
        ) {
          return { show: true, isCard1Better: true, isCard2Better: false };
        } else if (
          card1.minNetIncomeSelfEmployed > card2.minNetIncomeSelfEmployed
        ) {
          return { show: true, isCard1Better: false, isCard2Better: true };
        }
        return { show: true, isCard1Better: false, isCard2Better: false };

      case CreditCardAttributes.joiningFee:
        if (card2.id == 'blank') {
          return { show: true, isCard1Better: false, isCard2Better: false };
        } else if (card1.joiningFee === 0 && card2.joiningFee === 0)
          return { show: false, isCard1Better: false, isCard2Better: false };
        if (card1.joiningFee === card2.joiningFee)
          return { show: true, isCard1Better: false, isCard2Better: false };
        if (card1.joiningFee < card2.joiningFee)
          return { show: true, isCard1Better: true, isCard2Better: false };
        else return { show: true, isCard1Better: false, isCard2Better: true };

      case CreditCardAttributes.annualFee:
        if (card2.id == 'blank') {
          return { show: true, isCard1Better: false, isCard2Better: false };
        } else if (card1.annualFee === 0 && card2.annualFee === 0)
          return { show: false, isCard1Better: false, isCard2Better: false };
        if (card1.annualFee === card2.annualFee)
          return { show: true, isCard1Better: false, isCard2Better: false };
        if (card1.annualFee < card2.annualFee)
          return { show: true, isCard1Better: true, isCard2Better: false };
        else return { show: true, isCard1Better: false, isCard2Better: true };

      case CreditCardAttributes.minAmountForAnnualFeeWaiver:
        if (card2.id == 'blank') {
          return { show: true, isCard1Better: false, isCard2Better: false };
        } else if (
          card1.minAmountForAnnualFeeWaiver === 0 &&
          card2.minAmountForAnnualFeeWaiver === 0
        )
          return { show: false, isCard1Better: false, isCard2Better: false };
        if (
          card1.minAmountForAnnualFeeWaiver ===
          card2.minAmountForAnnualFeeWaiver
        )
          return { show: true, isCard1Better: false, isCard2Better: false };
        if (
          card1.minAmountForAnnualFeeWaiver < card2.minAmountForAnnualFeeWaiver
        )
          return { show: true, isCard1Better: true, isCard2Better: false };
        else return { show: true, isCard1Better: false, isCard2Better: true };

      case CreditCardAttributes.signupBonusValue:
        if (card2.id == 'blank') {
          return { show: true, isCard1Better: false, isCard2Better: false };
        } else if (card1.signupBonusValue === 0 && card2.signupBonusValue === 0)
          return { show: false, isCard1Better: false, isCard2Better: false };
        if (card1.signupBonusValue === card2.signupBonusValue)
          return { show: true, isCard1Better: false, isCard2Better: false };
        if (card1.signupBonusValue > card2.signupBonusValue)
          return { show: true, isCard1Better: true, isCard2Better: false };
        else return { show: true, isCard1Better: false, isCard2Better: true };

      case CreditCardAttributes.signupBonusTerms:
        if (card2.id == 'blank') {
          return { show: true, isCard1Better: false, isCard2Better: false };
        } else if (
          card1.signupBonusTerms.length === 0 &&
          card2.signupBonusTerms.length === 0
        )
          return { show: false, isCard1Better: false, isCard2Better: false };
        else return { show: true, isCard1Better: false, isCard2Better: false };

      case CreditCardAttributes.domesticLounge:
        if (card2.id == 'blank') {
          return { show: true, isCard1Better: false, isCard2Better: false };
        } else if (card1.domesticLounge === 0 && card2.domesticLounge === 0)
          return { show: false, isCard1Better: false, isCard2Better: false };
        if (card1.domesticLounge === card2.domesticLounge)
          return { show: true, isCard1Better: false, isCard2Better: false };
        if (card1.domesticLounge > card2.domesticLounge)
          return { show: true, isCard1Better: true, isCard2Better: false };
        else return { show: true, isCard1Better: false, isCard2Better: true };

      case CreditCardAttributes.internationalLounge:
        if (card2.id == 'blank') {
          return { show: true, isCard1Better: false, isCard2Better: false };
        } else if (
          card1.internationalLounge === 0 &&
          card2.internationalLounge === 0
        )
          return { show: false, isCard1Better: false, isCard2Better: false };
        if (card1.internationalLounge === card2.internationalLounge)
          return { show: true, isCard1Better: false, isCard2Better: false };
        if (card1.internationalLounge > card2.internationalLounge)
          return { show: true, isCard1Better: true, isCard2Better: false };
        else return { show: true, isCard1Better: false, isCard2Better: true };

      case CreditCardAttributes.globalLounge:
        if (card2.id == 'blank') {
          return { show: true, isCard1Better: false, isCard2Better: false };
        } else if (card1.globalLounge === 0 && card2.globalLounge === 0)
          return { show: false, isCard1Better: false, isCard2Better: false };
        if (card1.globalLounge === card2.globalLounge)
          return { show: true, isCard1Better: false, isCard2Better: false };
        if (card1.globalLounge > card2.globalLounge)
          return { show: true, isCard1Better: true, isCard2Better: false };
        else return { show: true, isCard1Better: false, isCard2Better: true };

      case CreditCardAttributes.domesticGuestLounge:
        if (card2.id == 'blank') {
          return { show: true, isCard1Better: false, isCard2Better: false };
        } else if (
          card1.domesticGuestLounge === 0 &&
          card2.domesticGuestLounge === 0
        )
          return { show: false, isCard1Better: false, isCard2Better: false };
        if (card1.domesticGuestLounge === card2.domesticGuestLounge)
          return { show: true, isCard1Better: false, isCard2Better: false };
        if (card1.domesticGuestLounge > card2.domesticGuestLounge)
          return { show: true, isCard1Better: true, isCard2Better: false };
        else return { show: true, isCard1Better: false, isCard2Better: true };

      case CreditCardAttributes.internationalGuestLounge:
        if (card2.id == 'blank') {
          return { show: true, isCard1Better: false, isCard2Better: false };
        } else if (
          card1.internationalGuestLounge === 0 &&
          card2.internationalGuestLounge === 0
        )
          return { show: false, isCard1Better: false, isCard2Better: false };
        if (card1.internationalGuestLounge === card2.internationalGuestLounge)
          return { show: true, isCard1Better: false, isCard2Better: false };
        if (card1.internationalGuestLounge > card2.internationalGuestLounge)
          return { show: true, isCard1Better: true, isCard2Better: false };
        else return { show: true, isCard1Better: false, isCard2Better: true };

      case CreditCardAttributes.globalGuestLounge:
        if (card2.id == 'blank') {
          return { show: true, isCard1Better: false, isCard2Better: false };
        } else if (
          card1.globalGuestLounge === 0 &&
          card2.globalGuestLounge === 0
        )
          return { show: false, isCard1Better: false, isCard2Better: false };
        if (card1.globalGuestLounge === card2.globalGuestLounge)
          return { show: true, isCard1Better: false, isCard2Better: false };
        if (card1.globalGuestLounge > card2.globalGuestLounge)
          return { show: true, isCard1Better: true, isCard2Better: false };
        else return { show: true, isCard1Better: false, isCard2Better: true };

      case CreditCardAttributes.airportConcierge:
        if (card2.id == 'blank') {
          return { show: true, isCard1Better: false, isCard2Better: false };
        } else if (!card1.airportConcierge && !card2.airportConcierge)
          return { show: false, isCard1Better: false, isCard2Better: false };
        if (card1.airportConcierge === card2.airportConcierge)
          return { show: true, isCard1Better: false, isCard2Better: false };
        if (card1.airportConcierge)
          return { show: true, isCard1Better: true, isCard2Better: false };
        else return { show: true, isCard1Better: false, isCard2Better: true };

      case CreditCardAttributes.domesticGolfGamesPerQuater:
        if (card2.id == 'blank') {
          return { show: true, isCard1Better: false, isCard2Better: false };
        } else if (
          card1.domesticGolfGamesPerQuater === 0 &&
          card2.domesticGolfGamesPerQuater === 0
        )
          return { show: false, isCard1Better: false, isCard2Better: false };
        if (
          card1.domesticGolfGamesPerQuater === card2.domesticGolfGamesPerQuater
        )
          return { show: true, isCard1Better: false, isCard2Better: false };
        if (card1.domesticGolfGamesPerQuater > card2.domesticGolfGamesPerQuater)
          return { show: true, isCard1Better: true, isCard2Better: false };
        else return { show: true, isCard1Better: false, isCard2Better: true };

      case CreditCardAttributes.internationalGolfGamesPerQuater:
        if (card2.id == 'blank') {
          return { show: true, isCard1Better: false, isCard2Better: false };
        } else if (
          card1.internationalGolfGamesPerQuater === 0 &&
          card2.internationalGolfGamesPerQuater === 0
        )
          return { show: false, isCard1Better: false, isCard2Better: false };
        if (
          card1.internationalGolfGamesPerQuater ===
          card2.internationalGolfGamesPerQuater
        )
          return { show: true, isCard1Better: false, isCard2Better: false };
        if (
          card1.internationalGolfGamesPerQuater >
          card2.internationalGolfGamesPerQuater
        )
          return { show: true, isCard1Better: true, isCard2Better: false };
        else return { show: true, isCard1Better: false, isCard2Better: true };

      case CreditCardAttributes.pointValue:
        if (card2.id == 'blank') {
          return { show: true, isCard1Better: false, isCard2Better: false };
        } else if (card1.pointsValue === 0 && card2.pointsValue === 0)
          return { show: false, isCard1Better: false, isCard2Better: false };
        if (card1.pointsValue === card2.pointsValue)
          return { show: true, isCard1Better: false, isCard2Better: false };
        if (card1.pointsValue > card2.pointsValue)
          return { show: true, isCard1Better: true, isCard2Better: false };
        else return { show: true, isCard1Better: false, isCard2Better: true };

      case CreditCardAttributes.pointsConversion:
        if (card2.id == 'blank') {
          return { show: true, isCard1Better: false, isCard2Better: false };
        } else if (
          card1.pointsConversion.length < 1 &&
          card2.pointsConversion.length < 1
        )
          return { show: false, isCard1Better: false, isCard2Better: false };
        else return { show: true, isCard1Better: false, isCard2Better: false };
      case CreditCardAttributes.membershipTaj:
        if (card2.id == 'blank') {
          return { show: true, isCard1Better: false, isCard2Better: false };
        }
        var card1Level = HotelUtils.getTajMembershipData(
          card1.membershipTaj
        ).level;
        var card2Level = HotelUtils.getTajMembershipData(
          card2.membershipTaj
        ).level;

        if (card1Level === 0 && card2Level === 0)
          return { show: false, isCard1Better: false, isCard2Better: false };
        if (card1Level === card2Level)
          return { show: true, isCard1Better: false, isCard2Better: false };
        return {
          show: true,
          isCard1Better: card1Level > card2Level,
          isCard2Better: card2Level > card1Level,
        };

      case CreditCardAttributes.membershipBonvoy:
        if (card2.id == 'blank') {
          return { show: true, isCard1Better: false, isCard2Better: false };
        }
        var card1Level = HotelUtils.getBonvoyMembershipData(
          card1.membershipBonvoy
        ).level;
        var card2Level = HotelUtils.getBonvoyMembershipData(
          card2.membershipBonvoy
        ).level;

        if (card1Level === 0 && card2Level === 0)
          return { show: false, isCard1Better: false, isCard2Better: false };

        if (card1Level === card2Level) {
          return { show: true, isCard1Better: false, isCard2Better: false };
        }

        return {
          show: true,
          isCard1Better: card1Level > card2Level,
          isCard2Better: card2Level > card1Level,
        };

      case CreditCardAttributes.membershipHiltonHonors:
        if (card2.id == 'blank') {
          return { show: true, isCard1Better: false, isCard2Better: false };
        }

        var card1Level = HotelUtils.getHiltonHonorsMembershipData(
          card1.membershipHiltonHonors
        ).level;
        var card2Level = HotelUtils.getHiltonHonorsMembershipData(
          card2.membershipHiltonHonors
        ).level;

        if (card1Level === 0 && card2Level === 0)
          return { show: false, isCard1Better: false, isCard2Better: false };
        if (card1Level === card2Level)
          return { show: true, isCard1Better: false, isCard2Better: false };
        return {
          show: true,
          isCard1Better: card1Level > card2Level,
          isCard2Better: card2Level > card1Level,
        };
      case CreditCardAttributes.membershipHotelRadisson:
        if (card2.id == 'blank') {
          return { show: true, isCard1Better: false, isCard2Better: false };
        }
        var card1Level = HotelUtils.getRadissonMembershipData(
          card1.membershipHotelRadisson
        ).level;
        var card2Level = HotelUtils.getRadissonMembershipData(
          card2.membershipHotelRadisson
        ).level;

        if (card1Level === 0 && card2Level === 0)
          return { show: false, isCard1Better: false, isCard2Better: false };

        if (card1Level === card2Level) {
          return { show: true, isCard1Better: false, isCard2Better: false };
        }

        return {
          show: true,
          isCard1Better: card1Level > card2Level,
          isCard2Better: card2Level > card1Level,
        };

      case CreditCardAttributes.membershipAccorPlus:
        if (card2.id == 'blank') {
          return { show: true, isCard1Better: false, isCard2Better: false };
        }
        var card1Level = HotelUtils.getAccorPlusMembershipData(
          card1.membershipAccorPlus
        ).level;
        var card2Level = HotelUtils.getAccorPlusMembershipData(
          card2.membershipAccorPlus
        ).level;

        if (card1Level === 0 && card2Level === 0)
          return { show: false, isCard1Better: false, isCard2Better: false };

        if (card1Level === card2Level) {
          return { show: true, isCard1Better: false, isCard2Better: false };
        }

        return {
          show: true,
          isCard1Better: card1Level > card2Level,
          isCard2Better: card2Level > card1Level,
        };

      case CreditCardAttributes.membershipPostcardSunshineClub:
        if (card2.id == 'blank') {
          return { show: true, isCard1Better: false, isCard2Better: false };
        }
        var card1Level = HotelUtils.getSunshineClubMembershipData(
          card1.membershipPostcardSunshineClub
        ).level;
        var card2Level = HotelUtils.getSunshineClubMembershipData(
          card2.membershipPostcardSunshineClub
        ).level;

        if (card1Level === 0 && card2Level === 0)
          return { show: false, isCard1Better: false, isCard2Better: false };

        if (card1Level === card2Level) {
          return { show: true, isCard1Better: false, isCard2Better: false };
        }

        return {
          show: true,
          isCard1Better: card1Level > card2Level,
          isCard2Better: card2Level > card1Level,
        };

      case CreditCardAttributes.membershipIPrefer:
        if (card2.id == 'blank') {
          return { show: true, isCard1Better: false, isCard2Better: false };
        }
        var card1Level = HotelUtils.getIPreferMembershipData(
          card1.membershipIPrefer
        ).level;
        var card2Level = HotelUtils.getIPreferMembershipData(
          card2.membershipIPrefer
        ).level;

        if (card1Level === 0 && card2Level === 0)
          return { show: false, isCard1Better: false, isCard2Better: false };

        if (card1Level === card2Level) {
          return { show: true, isCard1Better: false, isCard2Better: false };
        }

        return {
          show: true,
          isCard1Better: card1Level > card2Level,
          isCard2Better: card2Level > card1Level,
        };
      case CreditCardAttributes.introductoryOffers:
        if (card2.id == 'blank') {
          return { show: true, isCard1Better: false, isCard2Better: false };
        } else if (
          card1.introductoryOffers === '' &&
          card2.introductoryOffers === ''
        ) {
          return { show: false, isCard1Better: false, isCard2Better: false };
        } else {
          return { show: true, isCard1Better: false, isCard2Better: false };
        }

      case CreditCardAttributes.membership:
        if (card2.id == 'blank') {
          return { show: true, isCard1Better: false, isCard2Better: false };
        } else if (card1.membership.length < 1 && card2.membership.length < 1) {
          return { show: false, isCard1Better: false, isCard2Better: false };
        } else {
          return { show: true, isCard1Better: false, isCard2Better: false };
        }

      default:
        return { show: false, isCard1Better: false, isCard2Better: false };
    }
  }
}
