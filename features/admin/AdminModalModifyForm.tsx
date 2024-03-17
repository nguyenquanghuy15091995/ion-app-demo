"use client";

import ModalNormal from "@/shared/modal/ModalNormal";
import { useAdminStore } from "@/stores/admin";
import { ComponentRelation, ThemeDetailRelation } from "@/utils/types/params";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";

const AdminModalModifyForm = () => {
  const { isModalModifyOpen, setIsModalModifyOpen, setCurrentThemeDetail, currentThemeDetail, themeDetailList, setThemeDetailList } = useAdminStore();

  const [currentComponent, setCurrentComponent] = useState<ComponentRelation | undefined>();

  const closeModal = () => {
    setCurrentThemeDetail(undefined);
    setIsModalModifyOpen(false);
  }

  const onValueChange = ({ attrId, newValue }: { attrId?: number, newValue: string }) => {
    if (currentComponent) {
      const newComponent: ComponentRelation = {
        ...currentComponent,
        componentAttributes: currentComponent.componentAttributes.map(compAttr => {
          return ({
            ...compAttr,
            dataContent: attrId === compAttr.attributeId ? newValue : compAttr.dataContent,
          });
        })
      };
      setCurrentComponent(newComponent);
    }
  }

  const onUpdateData = () => {
    if (currentThemeDetail && currentComponent) {
      const newThemeDetail: ThemeDetailRelation = {
        ...currentThemeDetail,
        components: [
          currentComponent,
        ],
      }

      const newThemeDetailList: ThemeDetailRelation[] = [];

      themeDetailList.forEach(td => {
        if (td.position === newThemeDetail.position) {
          newThemeDetailList.push(newThemeDetail);
        } else {
          newThemeDetailList.push(td);
        }
      });

      setThemeDetailList(newThemeDetailList);

      closeModal();
    }
  }

  const onDeleteData = () => {
    if (currentThemeDetail) {
      const newThemeDetailList: ThemeDetailRelation[] = [];

      themeDetailList.forEach(td => {
        if (td.position === currentThemeDetail.position) {
          newThemeDetailList.push({
            ...currentThemeDetail,
            isDeleted: 1,
          });
        } else {
          newThemeDetailList.push(td);
        }
      });

      setThemeDetailList(newThemeDetailList);

      closeModal();
    }
  }

  useEffect(() => {
    setCurrentComponent(currentThemeDetail?.components?.[0])
  }, [currentThemeDetail]);

  return (
    <>
      <ModalNormal
        open={isModalModifyOpen}
        onClose={closeModal}
        title={"Modify Component Data"}
      >
        {currentComponent && (
          <form>
            {currentComponent.componentType.attributes.map((attr, attrIdx) => {
              const currentCompAttr = currentComponent.componentAttributes.find(compAttr => compAttr.attributeId === attr.id);
              const value = currentCompAttr?.dataContent || "";
              return (
                <div
                  className={clsx("p-3")}
                  key={`${attr.id}-${attrIdx}`}
                >
                  <label className={clsx("w-full pb-2 block font-medium")}>{attr.description}</label>
                  <input
                    type="text"
                    className={clsx("w-full border rounded-lg py-2 px-3")}
                    required
                    value={value}
                    onChange={(e) => onValueChange({ attrId: attr.id, newValue: e.target.value })}
                  />
                </div>
              );
            })}
            <div className={clsx("flex gap-3 px-3 py-4 justify-end items-center")}>
              <button
                type="button"
                onClick={onUpdateData}
                className={clsx("px-4 py-2 text-white bg-blue-500 hover:bg-blue-400 rounded-lg text-md font-medium")}
              >
                Update
              </button>
              <button
                type="button"
                onClick={onDeleteData}
                className={clsx("px-4 py-2 text-white bg-red-500 hover:bg-red-400 rounded-lg text-md font-medium")}
              >
                Delete
              </button>
              <button
                type="button"
                onClick={closeModal}
                className={clsx("px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-md font-medium")}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </ModalNormal>
    </>
  );
}

export default AdminModalModifyForm;
