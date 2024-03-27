export interface Spend {
  [key: string]: string;
}

export const addSpend = (key: string, value: string): void => {
  const currentSpendJSON: string | null = localStorage.getItem("Spend");
  let currentSpend: Spend = {};

  if (currentSpendJSON !== null) {
    currentSpend = JSON.parse(currentSpendJSON);
  }

  currentSpend[key] = value;

  localStorage.setItem("Spend", JSON.stringify(currentSpend));
};

export const getSpend = (): { spendObject: Spend; totalSum: number } => {
  let totalSum: number = 0;

  const spendJSON: string | null = localStorage.getItem("Spend");
  let spendObject: Spend = {};

  if (spendJSON !== null) {
    spendObject = JSON.parse(spendJSON);

    for (const key in spendObject) {
      if (Object.prototype.hasOwnProperty.call(spendObject, key)) {
        const value: number = parseFloat(spendObject[key]);
        if (!isNaN(value)) {
          totalSum += value;
        }
      }
    }
  }

  return { spendObject, totalSum };
};

export const removeSpend = (keyToRemove: string): void => {
  const spendJSON: string | null = localStorage.getItem("Spend");
  if (spendJSON !== null) {
    let spendObject: Spend = JSON.parse(spendJSON);

    if (spendObject.hasOwnProperty(keyToRemove)) {
      delete spendObject[keyToRemove];
      localStorage.setItem("Spend", JSON.stringify(spendObject));
    } else {
      console.log(`Key '${keyToRemove}' does not exist.`);
    }
  }
};
