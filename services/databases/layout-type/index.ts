import { prisma } from "@/prisma/query";
import { LayoutType } from "@prisma/client";

export const getLayoutType = async (): Promise<LayoutType | null> => {
  return await prisma.layoutType.findFirst({
    where: {
      isDeleted: 0
    }
  });
}
