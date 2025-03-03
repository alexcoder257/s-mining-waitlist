"use client";

import React, { useEffect, useState } from "react";
import { PAYMENT_STATUS } from "@/constant/enum";
import { getRandomInteger } from "@/utils";
import ModalPaymentNotify from "./ModalPaymentNotify";
import SemiCircularProgress from "./SemiCircularProgress";

type PaymentProcessingProps = {
  paymentAmount: number;
  paymentStatus: PAYMENT_STATUS;
  onCancel?: () => void;
};

export default function PaymentProcessing({
  paymentStatus,
  paymentAmount,
  onCancel,
}: PaymentProcessingProps) {
  const [countTransfer, setCountTransfer] = useState(0);
  const [showModalPaymentNotify, setShowModalPaymentNotify] =
    useState<boolean>(false);

  useEffect(() => {
    if (
      ![
        PAYMENT_STATUS.PROCESSING,
        PAYMENT_STATUS.CANCELED,
        PAYMENT_STATUS.COMPLETE,
      ].includes(paymentStatus)
    )
      return;
    if (
      paymentStatus === PAYMENT_STATUS.PROCESSING ||
      paymentStatus === PAYMENT_STATUS.COMPLETE
    ) {
      const countdownTime = 100;
      if (countTransfer >= paymentAmount) return;
      const timer = setInterval(() => {
        const transferAmount = getRandomInteger(5, 20);
        setCountTransfer((prevCount) => {
          if (prevCount < paymentAmount) {
            return prevCount > paymentAmount
              ? paymentAmount
              : prevCount + transferAmount;
          } else {
            setShowModalPaymentNotify(true);
            clearInterval(timer);
            return paymentAmount;
          }
        });
      }, countdownTime);

      return () => clearInterval(timer);
    } else if (paymentStatus === PAYMENT_STATUS.CANCELED) {
      setShowModalPaymentNotify(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-6">
      <div className="text-center text-[24px]/[29px] font-[700] lg:hidden mb-2">
        Payment processing
      </div>
      <p className="text-center text-[#B3B3B3] text-xs mb-8">
        Please wait while we verify your payment.
      </p>
      <ModalPaymentNotify
        open={showModalPaymentNotify}
        onCancel={() => {
          setShowModalPaymentNotify(false);
          onCancel?.();
        }}
        status={paymentStatus}
      />
      <SemiCircularProgress value={countTransfer} max={paymentAmount} />
      <button
        className="text-base w-full h-12 border border-[#D9D9D9] rounded-lg font-semibold"
        onClick={onCancel}
      >
        Close
      </button>
    </div>
  );
}
