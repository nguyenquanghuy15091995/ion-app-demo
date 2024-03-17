import { PrismaClient } from "@prisma/client";

export const createComponentType = async (prisma: PrismaClient) => {
  const list = await prisma.componentType.findMany();
  if (list.length === 0) {
    const result = await prisma.componentType.createMany({
      data: [
        {
          code: "paragraph_normal_1",
          name: "Paragraph Normal 1",
          description: ""
        },
        {
          code: "button_normal_1",
          name: "Button Normal 1",
          description: ""
        },
      ]
    })
    return result;
  }
  return null;
}
