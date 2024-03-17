"use client";

import { useAdminStore } from "@/stores/admin";
import { apis } from "@/services/apis";
import { useEffect } from "react";
import { LayoutType, Theme } from "@prisma/client";

const AdminInitialize = () => {
  const { setComponentTypeList, setThemeDetailList, setCurrentLayoutType, setCurrentTheme, setIsPageLoading } = useAdminStore();

  useEffect(() => {
    const initAdminData = async () => {
      try {
        setIsPageLoading(true);
        const resDataList = await Promise.allSettled([
          apis.componentType.getManyComponentType(),
          apis.layoutType.getOnceLayoutType(),
          apis.theme.getOnceTheme()
        ]);
        resDataList.forEach((resData, resIdx) => {
          if (resData.status === "fulfilled") {
            switch (resIdx) {
              case 0:
                setComponentTypeList(Array.isArray(resData.value.data) ? resData.value.data : []);
                break;
              case 1:
                setCurrentLayoutType(resData.value.data as LayoutType | null || undefined);
                break;
              case 2:
                setCurrentTheme(resData.value.data as Theme | null || undefined);
                break;
              default:
                break;
            }
          }
        });
        if (resDataList[2].status === "fulfilled") {
          const resThemeDetailList = await apis.themeDetail.getManyThemeDetailByThemeId({ themeId: resDataList[2].value.data?.id || -1 });
          setThemeDetailList(resThemeDetailList.data)
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsPageLoading(false);
      }
    }
    initAdminData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <></>
  );
}

export default AdminInitialize;
