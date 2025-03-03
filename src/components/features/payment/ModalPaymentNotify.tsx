/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from "react";
import { Modal as AntdModal } from "antd";
import Icon from "@/components/share/Icon";
import { PAYMENT_STATUS } from "@/constant/enum";

type ModalPaymentNotifyProps = {
  open: boolean;
  onCancel: () => void;
  status: PAYMENT_STATUS;
};

export default function ModalPaymentNotify({
  open,
  onCancel,
  status,
}: ModalPaymentNotifyProps) {
  const infoTextMemo: any = useMemo(() => {
    switch (status) {
      //   case PAYMENT_STATUS.PROCESSING:
      //   case PAYMENT_STATUS.COMPLETE:
      //     return {
      //       title: "Payment Successful",
      //       desc: "Thank you for your payment. Your payment has been processed, and a confirmation email with details about your waitlist registration has been sent to your inbox.",
      //     };
      case PAYMENT_STATUS.CANCELED:
        return {
          title: "Transaction timeout",
          desc: "Try again after a few minutes or contact customer support to retrieve your money.",
        };
      default:
        return { title: "", desc: "" };
    }
  }, [status]);
  return (
    <AntdModal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={400}
      centered
      closable={false}
    >
      <div className="p-6 relative">
        {/* <div
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center border-[1px] border-neutrals rounded-[40px] box-border hover:bg-neutrals_2 hover:border-neutrals_4 cursor-pointer"
          onClick={onCancel}
        >
          <Icon name="cancel" width="16px" height="16px" />
        </div> */}
        {/* {(status == PAYMENT_STATUS.PROCESSING ||
          status == PAYMENT_STATUS.COMPLETE) && (
          <Icon
            name="check-circle-fill"
            width="128px"
            height="128px"
            stroke="#0BA83E"
          />
        )} */}
        {status == PAYMENT_STATUS.CANCELED && (
          <Icon
            name="clock-countdown"
            width="128px"
            height="128px"
            stroke="#E10500"
          />
        )}
        <div className="mt-6 text-[24px]/[29px] font-[700] text-center">
          {infoTextMemo.title || ""}
        </div>
        <p className="mt-6 text-[#777E91] text-center">
          {infoTextMemo.desc || ""}
        </p>
        <button
          className="mt-6 border border-[#D9D9D9] rounded-lg h-10 w-full text-[16px]/[24px] font-semibold"
          onClick={onCancel}
        >
          Back to dashboard
        </button>
      </div>
    </AntdModal>
  );
}
