export const addAccountSettings = (value: Settings): void => {
  localStorage.setItem("Settings", JSON.stringify(value));
};

export const getAccountSettings = (): Settings => {
  const defaultSettings: Settings = {
    checking: "3",
    saving: "1",
    donation: "1",
  };

  if (typeof window !== "undefined") {
    const settingString: string | null = localStorage.getItem("Settings");
    const settingObject =
      settingString !== null ? JSON.parse(settingString) : defaultSettings;
    return settingObject;
  }
  return defaultSettings;
};

export const addFunds = (key: string, value: string, account: string): void => {
  const fundName = `${account}Funds`;
  const currentFundJSON: string | null = localStorage.getItem(fundName);
  let currentFund: Fund = {};

  if (currentFundJSON !== null) {
    currentFund = JSON.parse(currentFundJSON);
  }
  currentFund[key] = value;

  localStorage.setItem(fundName, JSON.stringify(currentFund));
};

export const getFunds = (account: string): Fund => {
  const fundName = `${account}Funds`;
  const fundJSON: string | null = localStorage.getItem(fundName);
  const fundObject = fundJSON !== null ? JSON.parse(fundJSON) : {};

  return fundObject;
};

export const removeFunds = (key: string, account: string): void => {
  const fundName = `${account}Funds`;
  const fundJSON: string | null = localStorage.getItem(fundName);

  if (fundJSON !== null) {
    let fundObject: Spend = JSON.parse(fundJSON);

    if (fundObject.hasOwnProperty(key)) {
      delete fundObject[key];
      localStorage.setItem(fundName, JSON.stringify(fundObject));
    } else {
      console.log(`'${account}' does not exist.`);
    }
  }
};

export const addSpend = (key: string, value: string, account: string): void => {
  const currentSpendJSON: string | null = localStorage.getItem("Spend");
  let currentSpend: Spend = {};

  if (currentSpendJSON !== null) {
    currentSpend = JSON.parse(currentSpendJSON);
  }
  currentSpend[key] = { value, account };

  localStorage.setItem("Spend", JSON.stringify(currentSpend));
};

export const getSpend = (): {
  spendObject: Spend;
  totalObject: Totals;
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

  const totalObject: Totals = {
    totalSum,
    totalChecking,
    totalSaving,
    totalDonation,
  };

  return { spendObject, totalObject };
};

export const removeSpend = (key: string): void => {
  const spendJSON: string | null = localStorage.getItem("Spend");
  if (spendJSON !== null) {
    let spendObject: Spend = JSON.parse(spendJSON);

    if (spendObject.hasOwnProperty(key)) {
      delete spendObject[key];
      localStorage.setItem("Spend", JSON.stringify(spendObject));
    } else {
      console.log(`'${key}' does not exist.`);
    }
  }
};

export interface Spend {
  [key: string]: { value: string; account: string };
}

export interface Fund {
  [key: string]: string;
}

export interface Totals {
  totalSum: number;
  totalChecking: number;
  totalSaving: number;
  totalDonation: number;
}

interface Settings {
  checking: string;
  saving: string;
  donation: string;
}
