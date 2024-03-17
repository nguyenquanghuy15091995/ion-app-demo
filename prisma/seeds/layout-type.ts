import { PrismaClient } from "@prisma/client";

export const createLayoutType = async (prisma: PrismaClient) => {
  const list = await prisma.layoutType.findMany();
  if (list.length === 0) {
    const result = await prisma.layoutType.createMany({
      data: [
        {
          code: "grid_r1_c1",
          name: "Grid row-1 cols-1",
          description: ""
        }
      ]
    })
    return result;
  }
  return null;
}
