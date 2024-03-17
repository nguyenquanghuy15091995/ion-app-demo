import { fetching } from "@/utils/fetching";
import { ComponentAttribute } from "@prisma/client";

export const upsertManyTComponentAttribute = async (params?: { options?: RequestInit, body: Partial<ComponentAttribute>[] }) => {
  return await fetching.post<{ data: ComponentAttribute[] }, Partial<ComponentAttribute>[]>({
    url: `/component-attributes/upsert`,
    options: params?.options,
    body: params?.body,
  });
}
