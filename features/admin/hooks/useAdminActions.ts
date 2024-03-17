import { apis } from "@/services/apis";
import { useAdminStore } from "@/stores/admin";
import { ThemeDetailRelation } from "@/utils/types/params";
import { Component, ComponentAttribute, ThemeDetail } from "@prisma/client";
import { useState } from "react";

export const useAdminActions = () => {
  const { themeDetailList, currentTheme, setThemeDetailList } = useAdminStore();
  const [saveLoading, setSaveLoading] = useState<boolean>(false);

  const saveAdminData = async () => {
    try {
      setSaveLoading(true);
      let newThemeDetailList: ThemeDetailRelation[] = [];
      const pureThemeDetailList: Partial<ThemeDetail>[] = themeDetailList.map((td, tdIdx) => ({
        id: td.id,
        isDeleted: td.isDeleted,
        layoutTypeCode: td.layoutTypeCode,
        position: tdIdx + 1,
        themeId: td.themeId,
      }));
      const resUpsertThemeDetailList = await apis.themeDetail.upsertManyThemeDetail({
        body: pureThemeDetailList
      });
      resUpsertThemeDetailList.data.forEach(resTd => {
        newThemeDetailList.push({
          ...resTd,
          components: themeDetailList.find(td => td.position === resTd.position)?.components?.map((comp, compIdx) => ({
            ...comp,
            themeDetailId: resTd.id,
            position: compIdx + 1,
          })),
        });
      });

      // ------------------------------------------
      // Component
      const pureComponentList: Partial<Component>[] = [];
      newThemeDetailList.forEach(td => {
        if (Array.isArray(td.components)) {
          td.components.forEach((comp) => {
            pureComponentList.push({
              ...comp,
            })
          });
        }
      });

      const resUpsertComponentList = await apis.component.upsertManyComponent({
        body: pureComponentList
      });

      newThemeDetailList = newThemeDetailList.map(td => ({
        ...td,
        components: td.components?.map(comp => {
          const newId = resUpsertComponentList.data.find(newComp => newComp.themeDetailId === comp.themeDetailId && newComp.position === comp.position)?.id;
          return {
            ...comp,
            id: newId,
          }
        })
      }));

      // ------------------------------------------
      // Component Attribute
      const PureCompAttrList: Partial<ComponentAttribute>[] = [];
      newThemeDetailList.forEach(td => {
        if (Array.isArray(td.components)) {
          td.components.forEach((comp) => {
            comp.componentAttributes.forEach(compAttr => {
              PureCompAttrList.push({
                ...compAttr,
                componentId: comp.id,
              });
            });
          });
        }
      });

      const resUpsertCompAttrList = await apis.componentAttribute.upsertManyTComponentAttribute({
        body: PureCompAttrList
      });

      if (currentTheme) {
        const resThemeDetailList = await apis.themeDetail.getManyThemeDetailByThemeId({ themeId: currentTheme.id });
        setThemeDetailList(resThemeDetailList.data)
      }

    } catch (error) {
      console.error(error);
    } finally {
      setSaveLoading(false);
    }
  }

  return {
    saveAdminData,
    saveLoading
  };
}