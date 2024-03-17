import { fetching } from "@/utils/fetching";
import { ComponentTypeRelation } from "@/utils/types/params";

export const getManyAttributeByComponentTypeCode = async ({ componentTypeCode, options }: { componentTypeCode: string, options?: RequestInit }) => {
  return await fetching.get<{ data: ComponentTypeRelation[] }>({
    url: `/attributes/component-type-code/${componentTypeCode}`,
    options: options,
  });
}
