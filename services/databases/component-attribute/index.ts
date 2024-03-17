import { prisma } from "@/prisma/query";
import { ComponentAttribute } from "@prisma/client";

export const upsertManyComponentAttribute = async ({ newDataList }: { newDataList: ComponentAttribute[] }) => {
  return await prisma.$transaction(
    newDataList.map(data => prisma.componentAttribute.upsert({
      where: {
        uniqueCompAttr: {
          attributeId: data.attributeId,
          componentId: data.componentId,
        }
      },
      update: {
        dataContent: data.dataContent,
        isDeleted: data.isDeleted,
      },
      create: {
        attributeId: data.attributeId,
        componentId: data.componentId,
        dataContent: data.dataContent,
      }
    }))
  );
}