import { fetching } from "@/utils/fetching";
import { ThemeDetailRelation } from "@/utils/types/params";
import { ThemeDetail } from "@prisma/client";

export const getManyThemeDetailByThemeId = async (params?: { themeId: number, options?: RequestInit }) => {
  return await fetching.get<{ data: ThemeDetailRelation[] }>({
    url: `/theme-details/theme-id/${params?.themeId}`,
    options: params?.options,
  });
}

export const upsertManyThemeDetail = async (params?: { options?: RequestInit, body: Partial<ThemeDetail>[] }) => {
  return await fetching.post<{ data: ThemeDetail[] }, Partial<ThemeDetail>[]>({
    url: `/theme-details/upsert`,
    options: params?.options,
    body: params?.body,
  });
}
