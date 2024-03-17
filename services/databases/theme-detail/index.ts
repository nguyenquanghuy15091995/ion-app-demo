import { prisma } from "@/prisma/query";
import { ThemeDetail } from "@prisma/client";

export const getManyThemeDetailByThemeId = async ({ themeId }: { themeId: number }) => {
  return await prisma.themeDetail.findMany({
    where: {
      themeId: themeId,
      isDeleted: 0
    },
    include: {
      components: {
        include: {
          componentAttributes: true,
          componentType: {
            include: {
              attributes: true,
            }
          },
        },
      },
      layoutType: true,
    }
  })
}

export const createManyThemeDetail = async (newDataList: ThemeDetail[]) => {
  return await prisma.$transaction(
    newDataList.map(data => prisma.themeDetail.create({
      data: data
    }))
  );
}

export const updateManyThemeDetail = async (newDataList: ThemeDetail[]) => {
  return await prisma.$transaction(
    newDataList.map(data => prisma.themeDetail.update({
      where: {
        id: data.id,
      },
      data: data,
    }))
  );
}

export const upsertManyThemeDetail = async ({ newDataList }: { newDataList: ThemeDetail[] }) => {
  return await prisma.$transaction(
    newDataList.map(data => {
      if(data.id) {
        return prisma.themeDetail.update({
          where: {
            id: data.id,
          },
          data: {
            themeId: data.themeId,
            isDeleted: data.isDeleted,
            layoutTypeCode: data.layoutTypeCode,
            position: data.position,
          }
        });
      } else {
        return prisma.themeDetail.create({
          data: {
            themeId: data.themeId,
            layoutTypeCode: data.layoutTypeCode,
            position: data.position,
          }
        });
      }
    })
  );
}
