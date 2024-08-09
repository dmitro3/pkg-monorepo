import { useBadgeControllerAwardBadge } from "@winrlabs/api";
import { useCurrentAccount } from "@winrlabs/web3";

enum Badge {
  LuckyWinner = "LuckyWinner",
  BettingBuddy = "BettingBuddy",
  BankrollBooster = "BankrollBooster",
  StakingStar = "StakingStar",
  VolumeUp = "VolumeUp",
  StakingTycoon = "StakingTycoon",
  ReferralBadge = "ReferralBadge",
  BetVeteran = "BetVeteran",
  BankrollHyperBooster = "BankrollHyperBooster",
  BettingTitan = "BettingTitan",
  LuckyStriker = "LuckyStriker",
  WeeklyClaimer = "WeeklyClaimer",
  LossLegend = "LossLegend",
  WinrChainKingpin = "WinrChainKingpin",
  BankrollCashCow = "BankrollCashCow",
  StakingSage = "StakingSage",
  JackpotJamboree = "JackpotJamboree",
  VolumeWinner = "VolumeWinner",
  LuckyStreak = "LuckyStreak",
  GamblingGuru = "GamblingGuru",
  DailyStreak = "DailyStreak",
  WinrChainer = "WinrChainer",
  HighRoller = "HighRoller",
  LuckyRoller = "LuckyRoller",
}

export const useGetBadges = () => {
  const { mutateAsync: getBadgeMutation } = useBadgeControllerAwardBadge({});
  const currentAccount = useCurrentAccount();

  const handleGetBadges = async ({
    totalWager,
    totalPayout,
  }: {
    totalWager: number;
    totalPayout: number;
  }) => {
    const multiplier = totalPayout / totalWager;
    const totalProfit = totalPayout - totalWager;
    console.log(multiplier, totalProfit, totalWager, totalPayout);

    if (totalWager >= 1000)
      getBadgeMutation({
        body: {
          type: Badge.HighRoller,
          player: currentAccount.address || "0x",
        },
      });

    if (totalProfit <= -1000)
      getBadgeMutation({
        body: {
          type: Badge.LossLegend,
          player: currentAccount.address || "0x",
        },
      });

    if (multiplier >= 10)
      getBadgeMutation({
        body: {
          type: Badge.LuckyRoller,
          player: currentAccount.address || "0x",
        },
      });

    if (multiplier >= 1000)
      getBadgeMutation({
        body: {
          type: Badge.BettingTitan,
          player: currentAccount.address || "0x",
        },
      });
  };

  return {
    handleGetBadges,
  };
};

// profit, multiplier, totalWager

// high roller 1000$ single tx
// loss legend $1000 loss single tx
// lucky roller 10x multiplier
// betting titan 1000x multiplier
