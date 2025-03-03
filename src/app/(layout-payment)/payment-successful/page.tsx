"use client";

import Icon from "@/components/share/Icon";
import useIsMobile from "@/hooks/useIsMobile";
import { useRouter } from "next/navigation";
import React from "react";

export default function PaymentSuccessful() {
  const router = useRouter();
  const isMobile = useIsMobile();
  return (
    <div className="flex flex-col gap-[64px] items-center justify-center max-w-[719px] mx-auto pt-[187px]">
      <Icon
        name="payment-success"
        width={isMobile ? "181px" : "222px"}
        height={isMobile ? "164px" : "200px"}
      />
      <div className="text-center px-8">
        <p className="text-[32px]/[38px] sm:text-[48px]/[57px] font-bold mb-2 sm:mb-4 bg-gradient_success bg-clip-text text-transparent">
          Payment Successful
        </p>
        <p className="text-[14px]/[20px] sm:text-[18px]/[21px]">
          Thank you for your payment. Your payment has been processed, and a
          confirmation email with details about your waitlist registration has
          been sent to your inbox.
        </p>
      </div>
      <button
        className="bg-white w-[200px] h-[44px] flex items-center justify-center text-brand_2 rounded-lg font-semibold"
        onClick={() => router.push("/")}
      >
        Dashboard
      </button>
    </div>
  );
}
