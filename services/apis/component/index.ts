import { fetching } from "@/utils/fetching";
import { Component } from "@prisma/client";

export const upsertManyComponent = async (params?: { options?: RequestInit, body: Partial<Component>[] }) => {
  return await fetching.post<{ data: Component[] }, Partial<Component>[]>({
    url: `/components/upsert`,
    options: params?.options,
    body: params?.body,
  });
}
