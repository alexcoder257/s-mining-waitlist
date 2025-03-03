"use client";
import React, { ReactNode } from "react";
import { Modal as AntdModal } from "antd";
import Icon from "../Icon";
import classNames from "classnames";

interface ModalProps {
  hiddenClose?: boolean;
  open: boolean;
  onCancel: () => void;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
  title?: string;
  width?: number;
  maskClosable?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  hiddenClose = false,
  maskClosable = true,
  open,
  onCancel,
  footer,
  title,
  children,
  width,
  className,
}) => {
  return (
    <AntdModal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={width}
      centered
      closable={false}
      maskClosable={maskClosable}
      className={classNames("custom-modal", className)}
    >
      <div className="flex justify-between pb-6 border-[#F2F2F2] border-b-[1px] p-6 max-lg:hidden">
        <p className="leading-8 font-bold text-2xl text-1 text-ellipsis overflow-hidden whitespace-nowrap ">
          {title}
        </p>
        {!hiddenClose && (
          <div
            className="w-8 h-8 flex items-center justify-center border-[1px] border-neutrals rounded-[40px] box-border hover:bg-neutrals_2 hover:border-neutrals_4 cursor-pointer"
            onClick={onCancel}
          >
            <Icon name="cancel" width="16px" height="16px" />
          </div>
        )}
      </div>
      <div
        className={classNames(
          "relative hidden max-lg:flex items-center justify-start ",
          !hiddenClose && title && "border-b border-neutrals_1 p-6"
        )}
      >
        <p className="whitespace-nowrap text-[24px]/[29px] font-semibold tracking-[0.55px] text-[#1E1E1E]">
          {title}
        </p>
        {!hiddenClose && (
          <div
            className="absolute right-[24px] p-2 border border-[#D9D9D9] rounded-lg"
            onClick={onCancel}
          >
            <Icon name="cancel" height="16px" width="16px" stroke="#1E1E1E" />
          </div>
        )}
      </div>
      <div>{children}</div>
      {footer && <div>{footer}</div>}
    </AntdModal>
  );
};

export default Modal;
