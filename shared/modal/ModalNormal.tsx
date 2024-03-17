"use client";
import clsx from "clsx";
import { ReactNode } from "react";
import Modal from "react-modal";

type ModalNormalProps = {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
  title?: string;
}

const ModalNormal = ({
  onClose,
  open,
  children,
  title,
}: ModalNormalProps) => {
  return (
    <>
      <Modal
        ariaHideApp={false}
        isOpen={open}
        style={{
          overlay: { zIndex: 500, backgroundColor: "rgba(0,0,0,0.5)" },
          content: {
            width: "60%",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-60%)",
            padding: 0,
            borderRadius: "12px"
          }
        }}
      >
        <div className={clsx("p-4 pr-9 relative")}>
          <p className={clsx("font-semibold text-lg")}>{title}</p>
          <div
            className={clsx("absolute font-medium top-3 right-4 z-10 p-2 rounded-full hover:bg-slate-100 w-7 h-7 flex items-center justify-center cursor-pointer select-none")}
            onClick={onClose}
          >
            x
          </div>
        </div>
        <div className={clsx("p-4 relative")}>
          {children}
        </div>
      </Modal>
    </>
  );
}

export default ModalNormal;
