import { fetching } from "@/utils/fetching";
import { ComponentTypeRelation } from "@/utils/types/params";

export const getManyComponentType = async (params?: { options?: RequestInit }) => {
  return await fetching.get<{ data: ComponentTypeRelation[] }>({
    url: `/component-types`,
    options: params?.options,
  });
}
