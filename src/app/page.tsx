"use client";

import { useState, useEffect } from "react";
import { getSpend } from "../utils/spend";
import { getFinancialData } from "../utils/amount";
import SpendList from "../components/spend";
import Settings from "../components/settings";
import Funds from "../components/funds";
import Image from "next/image";

export default function Home() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [checkingBalance, setCheckingBalance] = useState(0);
  const [savingBalance, setSavingBalance] = useState(0);
  const [donationBalance, setDonationBalance] = useState(0);

  useEffect(() => {
    updateAmount();
  }, []);

  const updateAmount = () => {
    const financeData = getFinancialData();
    const totals = getSpend().totalObject;
    const totalBalance = financeData.totalAmount - totals.totalSum;
    const checkingBalance = financeData.totalChecking - totals.totalChecking;
    const savingBalance = financeData.totalSaving - totals.totalSaving;
    const donationBalance = financeData.totalDonation - totals.totalDonation;
    setTotalAmount(totalBalance);
    setCheckingBalance(checkingBalance);
    setSavingBalance(savingBalance);
    setDonationBalance(donationBalance);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-12">
      <div className="w-full">
        <div className="flex h-auto w-auto items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/money.png"
              alt="money Logo"
              width={35}
              height={35}
              priority
            />
            <h1 className="ml-3 text-3xl">Pocket Money</h1>
          </div>
          <Settings updateAmount={updateAmount} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="p-4 flex flex-col items-center">
            <h2 className="mb-3 text-6xl font-semibold text-center">
              ${totalAmount}
            </h2>
            <p className="mt-2 text-xs">Total</p>
          </div>
          <div className="grid grid-cols-3 justify-center">
            <div className="p-4 flex flex-col items-center">
              <h2 className="mb-3 text-3xl font-semibold text-center">
                ${checkingBalance}
              </h2>
              <div className="flex">
                <p className="mr-2 text-xs">Checking</p>
                <Funds updateAmount={updateAmount} account="Checking" />
              </div>
            </div>
            <div className="p-4 flex flex-col items-center">
              <h2 className="mb-3 text-3xl font-semibold text-center">
                ${savingBalance}
              </h2>
              <div className="flex">
                <p className="mr-2 text-xs">Saving</p>
                <Funds updateAmount={updateAmount} account="Saving" />
              </div>
            </div>
            <div className="p-4 flex flex-col items-center">
              <h2 className="mb-3 text-3xl font-semibold text-center">
                ${donationBalance}
              </h2>
              <div className="flex">
                <p className="mr-2 text-xs">Donation</p>
                <Funds updateAmount={updateAmount} account="Donation" />
              </div>
            </div>
          </div>
        </div>
        <div className="md:pl-8 md:pt-4 md:pb-4 relative">
          <div className="absolute inset-y-0 left-0 w-px bg-white hidden sm:block" />
          <div className="sm:hidden h-px bg-white w-full mb-8" />
          <SpendList updateAmount={updateAmount} />
        </div>
      </div>

      <div>Trick Shot | 2024</div>
    </main>
  );
}
