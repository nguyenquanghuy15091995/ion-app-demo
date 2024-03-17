import { fetching } from "@/utils/fetching";
import { LayoutType } from "@prisma/client";

export const getOnceLayoutType = async (params?: { options?: RequestInit }) => {
  return await fetching.get<{ data: LayoutType | null }>({
    url: `/layout-types/once`,
    options: params?.options,
  });
}
