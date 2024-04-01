export interface Spend {
  [key: string]: { value: string; account: string };
}

export const addSpend = (key: string, value: string, account: string): void => {
  const currentSpendJSON: string | null = localStorage.getItem("Spend");
  let currentSpend: Spend = {};

  if (currentSpendJSON !== null) {
    currentSpend = JSON.parse(currentSpendJSON);
  }

  // currentSpend[key] = value;
  currentSpend[key] = { value, account };

  localStorage.setItem("Spend", JSON.stringify(currentSpend));
};

export const addAccountSetting = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

export const getAccountSetting = (key: string): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return "0";
};

export const getSpend = (): {
  spendObject: Spend;
  totalSum: number;
  totalChecking: number;
  totalSaving: number;
  totalDonation: number;
} => {
  let totalSum: number = 0;
  let totalChecking: number = 0;
  let totalSaving: number = 0;
  let totalDonation: number = 0;

  const spendJSON: string | null = localStorage.getItem("Spend");
  let spendObject: Spend = {};

  if (spendJSON !== null) {
    spendObject = JSON.parse(spendJSON);

    for (const key in spendObject) {
      if (Object.prototype.hasOwnProperty.call(spendObject, key)) {
        const amount: string = spendObject[key].account;
        if (amount) {
          const value: number = parseFloat(spendObject[key].value);
          totalSum += value;
          if (amount === "Checking") {
            totalChecking += value;
          } else if (amount === "Saving") {
            totalSaving += value;
          } else if (amount === "Donation") {
            totalDonation += value;
          }
        }
      }
    }
  }

  return { spendObject, totalSum, totalChecking, totalSaving, totalDonation };
};

export const removeSpend = (keyToRemove: string): void => {
  const spendJSON: string | null = localStorage.getItem("Spend");
  if (spendJSON !== null) {
    let spendObject: Spend = JSON.parse(spendJSON);

    if (spendObject.hasOwnProperty(keyToRemove)) {
      delete spendObject[keyToRemove];
      localStorage.setItem("Spend", JSON.stringify(spendObject));
    } else {
      console.log(`'${keyToRemove}' does not exist.`);
    }
  }
};
