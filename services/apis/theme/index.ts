import { fetching } from "@/utils/fetching";
import { Theme } from "@prisma/client";

export const getOnceTheme = async (params?: { options?: RequestInit }) => {
  return await fetching.get<{ data: Theme | null }>({
    url: `/themes/once`,
    options: params?.options,
  });
}
