import { apis } from "@/services/apis";
import SectionLayout from "@/shared/layout/SectionLayout";
import UIDynamic from "@/shared/ui-dynamic/UIDynamic";
import { ThemeDetailRelation } from "@/utils/types/params";

const Home = async () => {
  const themeDetailList: { data: ThemeDetailRelation[] } = await apis.themeDetail.getManyThemeDetailByThemeId({
    themeId: 1,
    options: { next: { revalidate: 2 } },
  })
  return (
    <main>
      {themeDetailList.data.map((td, tdIdx) => (
        <SectionLayout
          key={`${td.id}-${tdIdx}`}
        >
          {td.components?.map((comp, compIdx) => (
            <div
              className="p-3"
              key={`${comp.id}-${compIdx}`}
            >
              <UIDynamic
                component={comp}
              />
            </div>
          ))}
        </SectionLayout>
      ))}
    </main>
  );
}

export default Home;
