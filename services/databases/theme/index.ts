import { prisma } from "@/prisma/query";
import { Theme } from "@prisma/client";

export const getTheme = async (): Promise<Theme | null> => {
  return await prisma.theme.findFirst({
    where: {
      isDeleted: 0
    }
  });
}
