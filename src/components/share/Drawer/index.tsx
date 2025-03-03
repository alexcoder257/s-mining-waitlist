"use client";

import React, { useEffect } from "react";
import { Drawer as DrawerAntd } from "antd";
import Icon from "../Icon";
import classNames from "classnames";

type DrawerProps = {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  title?: string;
  titlePosition?: "center" | "left";
  placement?: "top" | "right" | "left" | "bottom";
  children: React.ReactNode;
  closeIcon?: React.ReactNode;
  open?: boolean;
  width?: string;
  closable?: boolean;
  onClose?: () => void;
  maskClosable?: boolean;
  className?: string;
  hiddenClose?: boolean;
};

export default function Drawer({
  hiddenClose = false,
  footer,
  title = "title",
  titlePosition,
  header,
  placement = "bottom",
  children,
  open = false,
  width = "50vw",
  closable = false,
  maskClosable = true,
  closeIcon,
  onClose,
  className,
}: DrawerProps) {
  const renderTitle = () => {
    switch (titlePosition) {
      case "center":
        return (
          <div className="py-4 mx-4 flex justify-between items-center border-b border-neutrals_1">
            <p className="uppercase text-sm leading-4 font-bold text-3 text-center flex-1">
              {title}
            </p>
            {!hiddenClose && (
              <Icon
                name="cancel"
                width="16px"
                height="16px"
                color="#1E1E1E"
                stroke="#1E1E1E"
                className="cursor-pointer"
                onClick={onClose}
              />
            )}
          </div>
        );
      case "left":
        return (
          <div className="flex justify-between items-center py-4 rounded-t-2xl overflow-hidden border-b border-neutrals_1">
            <p className="text-lg leading-6 font-bold">{title}</p>
            {!hiddenClose && (
              <Icon
                name="cancel"
                width="16px"
                height="16px"
                color="#1E1E1E"
                stroke="#1E1E1E"
                onClick={onClose}
                className="cursor-pointer"
              />
            )}
          </div>
        );
      default:
        return (
          <div className="flex justify-between items-center py-5 px-6 rounded-t-2xl overflow-hidden border-b border-neutrals_1">
            <p className="text-xl leading-6 font-bold">{title}</p>
            {!hiddenClose && (
              <div className="border border-[#D9D9D9] rounded-lg p-2">
                <Icon
                  name="cancel"
                  width="16px"
                  height="16px"
                  color="#1E1E1E"
                  stroke="#1E1E1E"
                  onClick={onClose}
                  className="cursor-pointer"
                />
              </div>
            )}
          </div>
        );
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <DrawerAntd
      maskClosable={maskClosable}
      title={header ? header : renderTitle()}
      placement={placement}
      open={open}
      closable={!hiddenClose && closable}
      width={width}
      onClose={onClose}
      footer={footer}
      className={classNames(className)}
      style={{
        maxHeight: "90vh",
        overflow: "auto",
      }}
      closeIcon={
        closeIcon ? (
          closeIcon
        ) : (
          <div className=" right-[24px] p-2 border border-[#D9D9D9] rounded-lg">
            <Icon
              name="cancel"
              width="16px"
              height="16px"
              color="#1E1E1E"
              stroke="#1E1E1E"
            />
          </div>
        )
      }
    >
      {children}
    </DrawerAntd>
  );
}
