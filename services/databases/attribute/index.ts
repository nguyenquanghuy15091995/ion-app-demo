import { prisma } from "@/prisma/query";

export const getManyAttributeByComponentTypeCode = async ({ componentTypeCode }: { componentTypeCode: string }) => {
  return await prisma.attribute.findMany({
    where: {
      componentTypeCode: componentTypeCode,
    },
  });
}
