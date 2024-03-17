import { useAdminStore } from "@/stores/admin"
import { ComponentTypeRelation, ThemeDetailRelation } from "@/utils/types/params";
import { LayoutType } from "@prisma/client";
import { useEffect, useRef } from "react";

export const useAdminDragItem = () => {
  const { currentTheme, themeDetailList, setThemeDetailList } = useAdminStore();
  const themeDetailListRef = useRef<ThemeDetailRelation[]>(themeDetailList);

  const pushToThemeDetail = ({
    componentType,
    layoutType
  }: {
    componentType: ComponentTypeRelation;
    layoutType: LayoutType;
  }) => {
    if (currentTheme) {
      const newThemeDetail: ThemeDetailRelation = {
        layoutTypeCode: layoutType.code,
        layoutType: layoutType,
        position: themeDetailListRef.current.length + 1,
        themeId: currentTheme.id,
        components: [
          {
            description: "",
            name: `${componentType.name}`,
            componentAttributes: componentType.attributes.map(attr => ({
              attributeId: attr.id,
              dataContent: componentType.name,
            })),
            position: 0,
            componentType: componentType,
            componentTypeCode: componentType.code
          }
        ]
      };
      themeDetailListRef.current.push(newThemeDetail);
      const newList = JSON.parse(JSON.stringify(themeDetailListRef.current)) as ThemeDetailRelation[];
      setThemeDetailList(newList);
    }
  }

  useEffect(() => {
    themeDetailListRef.current = themeDetailList;
  }, [themeDetailList])

  return {
    pushToThemeDetail
  };
}