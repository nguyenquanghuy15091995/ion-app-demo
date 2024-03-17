import { prisma } from "@/prisma/query";

export const getManyComponentType = async () => {
  return await prisma.componentType.findMany({
    where: {
      isDeleted: 0
    },
    include: {
      attributes: true,
    }
  });
}
