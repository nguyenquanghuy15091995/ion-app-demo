"use client";

import clsx from "clsx";
import { useDrag } from "react-dnd";
import ButtonNormal from "@/shared/button/ButtonNormal";
import ParagraphNormal from "@/shared/paragraph/ParagraphNormal";
import { useAdminDragItem } from "./hooks/useAdminDragItem";
import { ComponentTypeRelation } from "@/utils/types/params";
import { LayoutType } from "@prisma/client";

type AdminDragItemProps = {
  componentType: ComponentTypeRelation;
  layoutType: LayoutType;
}

const AdminDragItem = ({ componentType, layoutType }: AdminDragItemProps) => {
  const { pushToThemeDetail } = useAdminDragItem();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "box",
    item: componentType,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<ComponentTypeRelation>();
      if (item && dropResult) {
        pushToThemeDetail({
          layoutType: layoutType,
          componentType: item
        });
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;
  const code = componentType.code;

  return (
    <>
      <div
        ref={drag}
        className={clsx("snap-start flex items-center justify-center bg-slate-50 rounded-md py-3 px-6 relative")}
        style={{
          opacity: opacity,
        }}
      >
        <div className={clsx("cursor-grab absolute z-10 inset-0")} />
        {code === "button_normal_1" && (
          <ButtonNormal className="whitespace-nowrap">Normal Button</ButtonNormal>
        )}
        {code === "paragraph_normal_1" && (
          <ParagraphNormal className="whitespace-nowrap">Normal Paragraph</ParagraphNormal>
        )}
      </div>
    </>
  );
}

export default AdminDragItem;
