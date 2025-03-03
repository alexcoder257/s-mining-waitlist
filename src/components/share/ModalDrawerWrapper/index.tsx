"use client";
import React from "react";
import Drawer from "../Drawer";
import Modal from "../Modal";
import useIsMobile from "@/hooks/useIsMobile";

export type ModalDrawerWrapperProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  drawerPlacement?: "bottom" | "left" | "right";
  modalWidth?: number;
  drawerClassName?: string;
  modalClassName?: string;
  title?: string;
  hiddenClose?: boolean;
  maskClosable?: boolean;
};

export default function ModalDrawerWrapper({
  hiddenClose = false,
  open,
  setOpen,
  children,
  header,
  footer,
  drawerPlacement = "bottom",
  modalWidth = 490,
  drawerClassName,
  modalClassName,
  title,
  maskClosable = true,
}: ModalDrawerWrapperProps) {
  const isMobile = useIsMobile();

  const handleClose = () => setOpen(false);

  return isMobile ? (
    <Drawer
      maskClosable={maskClosable}
      open={open}
      onClose={handleClose}
      placement={drawerPlacement}
      title={title}
      header={header}
      className={drawerClassName}
      hiddenClose={hiddenClose}
    >
      <div>{children}</div>
      {footer && footer}
    </Drawer>
  ) : (
    <Modal
      maskClosable={maskClosable}
      hiddenClose={hiddenClose}
      open={open}
      width={modalWidth}
      title={title}
      onCancel={handleClose}
      footer={footer || null}
      className={modalClassName}
    >
      {children}
    </Modal>
  );
}
