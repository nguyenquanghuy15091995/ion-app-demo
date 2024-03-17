import { PrismaClient } from "@prisma/client";

import { createLayoutType } from "./seeds/layout-type";
import { createTheme } from "./seeds/theme";
import { createComponentType } from "./seeds/component-type";
import { createAttributeType } from "./seeds/attribute";

const runSeedCommand = async () => {
  const prisma = new PrismaClient();
  try {
    await createLayoutType(prisma);
    await createTheme(prisma);
    await createComponentType(prisma);
    await createAttributeType(prisma);
  } catch (error) {
    console.error(error);
  } finally {
    prisma.$disconnect();
  }
}

runSeedCommand();
