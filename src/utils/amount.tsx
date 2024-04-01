import { getAccountSetting } from "./spend";

interface FinancialData {
  totalAmount: number;
  totalChecking: number;
  totalSaving: number;
  totalDonation: number;
}

export const getFinancialData = (): FinancialData => {
  const checking = parseInt(getAccountSetting("Checking") || "3");
  const saving = parseInt(getAccountSetting("Saving") || "1");
  const donation = parseInt(getAccountSetting("Donation") || "1");

  const startDate: Date = new Date("2024-01-01");
  const today: Date = new Date();
  // Calculate the day of the week for the start date
  const startDayOfWeek: number = startDate.getDay();

  // Calculate days until the first Friday (if start date is not a Friday)
  let daysUntilFirstFriday: number = (5 - startDayOfWeek + 7) % 7;

  // If the start date is already a Friday, we don't want to add any days.
  // If not, we adjust the start date to the first upcoming Friday.
  let firstFriday: Date = new Date(startDate);
  if (daysUntilFirstFriday > 0) {
    firstFriday.setDate(startDate.getDate() + daysUntilFirstFriday);
  }

  const differenceInTime: number = today.getTime() - firstFriday.getTime();

  // Guard against negative difference if today is before the first Friday
  if (differenceInTime < 0) {
    return {
      totalAmount: 0,
      totalChecking: 0,
      totalSaving: 0,
      totalDonation: 0,
    };
  }

  const differenceInDays: number = differenceInTime / (1000 * 60 * 60 * 24);
  const totalFridays: number = Math.floor(differenceInDays / 7) + 1; // +1 to include the first Friday

  // Each Friday contributes Saving + Checking + Donations to the total amount
  const totalAmount: number = totalFridays * (checking + saving + donation);
  const totalChecking: number = totalFridays * checking;
  const totalSaving: number = totalFridays * saving;
  const totalDonation: number = totalFridays * donation;

  return { totalAmount, totalChecking, totalSaving, totalDonation };
};
