"use client";

import { useState, useEffect } from "react";
import { getSpend } from "../utils/spend";
import { calculateTotalAmount } from "../utils/amount";
import SpendList from "../components/spend";
import Image from "next/image";

export default function Home() {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    updateAmount();
  }, []);

  const updateAmount = () => {
    const amount = calculateTotalAmount();
    const spend = getSpend();
    const balance = amount - spend.totalSum;
    setTotalAmount(balance);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-12">
      <div className="md:w-full">
        <div className="flex lg:h-auto lg:w-auto">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 flex items-center justify-center">
          <h2 className="mb-3 text-2xl font-semibold text-center">
            Bank - ${totalAmount}
          </h2>
        </div>
        <div className="md:pl-8 md:pt-4 md:pb-4 relative">
          <div className="absolute inset-y-0 left-0 w-px bg-white hidden sm:block" />
          <SpendList updateAmount={updateAmount} />
        </div>
      </div>

      <div>Trick Shot | 2024</div>
    </main>
  );
}
