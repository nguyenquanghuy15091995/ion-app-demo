import { PrismaClient } from "@prisma/client";

export const createAttributeType = async (prisma: PrismaClient) => {
  const list = await prisma.attribute.findMany();
  if (list.length === 0) {
    const result = await prisma.attribute.createMany({
      data: [
        {
          name: "content",
          description: "Content of paragraph",
          componentTypeCode: "paragraph_normal_1"
        },
        {
          name: "button_text",
          description: "Text of button",
          componentTypeCode: "button_normal_1"
        },
        {
          name: "button_alert_text",
          description: "Text of alert after button clicked event",
          componentTypeCode: "button_normal_1"
        },
      ]
    })
    return result;
  }
  return null;
}
