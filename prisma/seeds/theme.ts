import { PrismaClient } from "@prisma/client";

export const createTheme = async (prisma: PrismaClient) => {
  const list = await prisma.theme.findMany();
  if (list.length === 0) {
    const result = await prisma.theme.createMany({
      data: [
        {
          name: "Theme 1",
          description: ""
        }
      ]
    })
    return result;
  }
  return null;
}
