import { ComponentTypeRelation, ThemeDetailRelation } from "@/utils/types/params";
import { Theme, LayoutType } from "@prisma/client";
import { create } from "zustand";

type AdminStoreProps = {
  themeDetailList: ThemeDetailRelation[];
  setThemeDetailList: (newData: ThemeDetailRelation[]) => void;
  componentTypeList: ComponentTypeRelation[];
  setComponentTypeList: (newData: ComponentTypeRelation[]) => void;
  currentTheme?: Theme;
  setCurrentTheme: (newData?: Theme) => void;
  currentLayoutType?: LayoutType;
  setCurrentLayoutType: (newData?: LayoutType) => void;
  isModalModifyOpen: boolean;
  setIsModalModifyOpen: (newData: boolean) => void;
  currentThemeDetail?: ThemeDetailRelation;
  setCurrentThemeDetail: (newData?: ThemeDetailRelation) => void;
}

export const useAdminStore = create<AdminStoreProps>((set) => ({
  themeDetailList: [],
  setThemeDetailList: (newData) => {
    newData.sort((a, b) => (a.position || 0) - (b.position || 0));
    for (let i = 0; i < newData.length; i += 1) {
      newData[i].components?.sort((a, b) => (a.position || 0) - (b.position || 0));
    }
    const filteredData = newData.filter(td => td.id || (!td.id && td.isDeleted !== 1)).map((td, tdIdx) => ({
      ...td,
      position: tdIdx + 1,
    }))
    set({ themeDetailList: filteredData });
  },
  componentTypeList: [],
  setComponentTypeList: (newData) => set({ componentTypeList: newData }),
  setCurrentTheme: (newData) => set({ currentTheme: newData }),
  setCurrentLayoutType: (newData) => set({ currentLayoutType: newData }),
  isModalModifyOpen: false,
  setIsModalModifyOpen: (newData) => set({ isModalModifyOpen: newData }),
  setCurrentThemeDetail: (newData) => set({ currentThemeDetail: newData }),
}))
