"use client";

import clsx from "clsx";
import { ReactNode } from "react";
import { useDrop } from "react-dnd";

type AdminDropPanelProps = {
  children?: ReactNode;
}

const AdminDropPanel = ({ children }: AdminDropPanelProps) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "box",
    drop: () => ({ name: "AdminDropPanel" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;
  return (
    <>
      <div ref={drop} className={clsx("flex-grow min-h-96", isActive ? "bg-blue-200" : "bg-white")}>
        {children}
      </div>
    </>
  );
}

export default AdminDropPanel;
