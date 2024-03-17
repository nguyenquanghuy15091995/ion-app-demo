"use client";

import clsx from "clsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AdminDropPanel from "./AdminDropPanel";
import AdminDragItem from "./AdminDragItem";
import { useAdminStore } from "@/stores/admin";
import AdminInitialize from "./AdminInitialize";
import SectionLayout from "@/shared/layout/SectionLayout";
import UIDynamic from "@/shared/ui-dynamic/UIDynamic";
import AdminActionList from "./AdminActionList";
import AdminModalModifyForm from "./AdminModalModifyForm";
import { ThemeDetailRelation } from "@/utils/types/params";

const AdminDnDContainer = () => {
  const { componentTypeList, themeDetailList, currentLayoutType, setIsModalModifyOpen, setCurrentThemeDetail } = useAdminStore();

  const openModalModify = (themeDetail: ThemeDetailRelation) => {
    setCurrentThemeDetail(themeDetail);
    setIsModalModifyOpen(true);
  }

  if (!componentTypeList || componentTypeList.length === 0 || !currentLayoutType) {
    return <></>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={clsx("flex flex-col justify-between gap-2")}>
        <div className={clsx("flex-grow flex flex-col overflow-auto", "h-[calc(100vh_-_220px)]")}>
          {themeDetailList.filter(td => td.isDeleted !== 1).map((themeDetail, themeDetailIdx) => (
            <SectionLayout
              key={`${themeDetail.id}-${themeDetailIdx}`}
              layoutType={themeDetail.layoutType}
            >
              {themeDetail.components?.filter(comp => comp.isDeleted !== 1).map((comp, compIdx) => (
                <div
                  key={`${comp.id}-${compIdx}`}
                  className={clsx("relative flex justify-center p-2")}
                >
                  <div
                    className={clsx("absolute inset-0 z-20 cursor-pointer hover:bg-blue-200/30")}
                    onClick={() => openModalModify(themeDetail)}
                  />
                  <UIDynamic
                    component={comp}
                  />
                </div>
              ))}
            </SectionLayout>
          ))}
          <AdminDropPanel />
        </div>
        <div>
          <div className={clsx("p-2 overflow-x-scroll bg-white border-t scroll-pl-6 snap-x flex items-stretch gap-3")}>
            {componentTypeList.map((compType, compTypeIdx) => (
              <AdminDragItem
                key={`${compType.code}-${compTypeIdx}`}
                componentType={compType}
                layoutType={currentLayoutType}
              />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

const AdminInitContainer = () => {
  const { isPageLoading } = useAdminStore();
  return (
    <>
      <AdminInitialize />
      {isPageLoading && (<div className={clsx("fixed z-[100] bg-white inset-0 flex items-center justify-center")}>
        <p className={clsx("animate-pulse font-bold text-2xl")}>Loading...</p>
      </div>)}
    </>
  );
}

const AdminPage = ({ }) => {
  return (
    <div className={clsx("pt-16")}>
      <AdminInitContainer />
      <header className={clsx("fixed top-0 left-0 h-14 w-full z-40 shadow border-b bg-white px-5 flex items-center justify-between")}>
        <div className={clsx("font-bold text-2xl")}>I-ON</div>
        <AdminActionList />
        <p className={clsx("hidden sm:flex items-center gap-2 font-medium tracking-tight")}><span className={clsx("font-semibold")}>Author:</span> Huy Nguyen</p>
      </header>
      <main>
        <AdminDnDContainer />
      </main>
      <footer className={clsx("p-2 border-t opacity-25")}>
        I-On demo
      </footer>
      <AdminModalModifyForm />
    </div>
  );
}

export default AdminPage;
