import { prisma } from "@/prisma/query";
import { Component } from "@prisma/client";

export const upsertManyComponent = async ({ newDataList }: { newDataList: Component[] }) => {
  return await prisma.$transaction(
    newDataList.map(data => {
      if (data.id) {
        return prisma.component.update({
          where: {
            id: data.id,
          },
          data: {
            name: data.name,
            description: data.description,
            isDeleted: data.isDeleted,
            themeDetailId: data.themeDetailId,
            position: data.position,
            componentTypeCode: data.componentTypeCode,
          }
        });
      } else {
        return prisma.component.create({
          data: {
            name: data.name,
            description: data.description,
            themeDetailId: data.themeDetailId,
            position: data.position,
            componentTypeCode: data.componentTypeCode,
          }
        });
      }
    })
  );
}
