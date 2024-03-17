import { getManyAttributeByComponentTypeCode } from "@/services/databases/attribute";
import { NextResponse, NextRequest } from "next/server";
import { Attribute } from "@prisma/client";

type DynamicRoute = {
  params: {
    slug: string;
  }
}

export const GET = async (req: NextRequest, dynamicRoute: DynamicRoute) => {
  try {
    const resData = await getManyAttributeByComponentTypeCode({ componentTypeCode: dynamicRoute.params.slug });
    return NextResponse.json<{ data: Attribute[] }>({
      data: resData,
    }, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json<{ message: string }>({
      message: "Internal server error!",
    }, {
      status: 500,
    });
  }
}
