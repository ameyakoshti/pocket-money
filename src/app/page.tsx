"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const calculateTotalAmount = (): number => {
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
    return 0;
  }

  const differenceInDays: number = differenceInTime / (1000 * 60 * 60 * 24);
  // Calculate the number of Fridays that have occurred
  const totalFridays: number = Math.floor(differenceInDays / 7) + 1; // +1 to include the first Friday

  // Each Friday contributes $5 to the total amount
  const totalAmount: number = totalFridays * 5;

  return totalAmount;
};

interface Spend {
  [key: string]: string;
}

const addSpend = (key: string, value: string): void => {
  // Retrieve the current Spend object from local storage, if it exists
  const currentSpendJSON: string | null = localStorage.getItem("Spend");
  let currentSpend: Spend = {};

  // If there's already a Spend object, parse it
  if (currentSpendJSON !== null) {
    currentSpend = JSON.parse(currentSpendJSON);
  }

  // Add or update the key-value pair in the Spend object
  currentSpend[key] = value;

  // Serialize the updated Spend object and save it back to local storage
  localStorage.setItem("Spend", JSON.stringify(currentSpend));
};

const getSpend = (): { spendObject: Spend; totalSum: number } => {
  // Initialize the total sum
  let totalSum: number = 0;

  // Retrieve and parse the Spend object from local storage
  const spendJSON: string | null = localStorage.getItem("Spend");
  let spendObject: Spend = {};

  if (spendJSON !== null) {
    spendObject = JSON.parse(spendJSON);

    // Calculate the sum of all values
    for (const key in spendObject) {
      if (Object.prototype.hasOwnProperty.call(spendObject, key)) {
        const value: number = parseFloat(spendObject[key]);
        // Check if the value is a valid number before adding to the total sum
        if (!isNaN(value)) {
          totalSum += value;
        }
      }
    }
  }

  // Return the Spend object and the total sum of its values
  return { spendObject, totalSum };
};

export default function Home() {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const amount = calculateTotalAmount();
    setTotalAmount(amount);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <Image
            src="/money.png"
            alt="money Logo"
            width={35}
            height={35}
            priority
          />
          <h1 className="ml-3 text-3xl">Pocket Money</h1>
        </div>
      </div>
      <h2 className="mb-3 text-2xl font-semibold">
        Collection: ${totalAmount}
      </h2>
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left"></div>
    </main>
  );
}
