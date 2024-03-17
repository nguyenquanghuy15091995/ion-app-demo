import { upsertManyComponentAttribute } from "@/services/databases/component-attribute";
import { NextResponse, NextRequest } from "next/server";
import { ComponentAttribute } from "@prisma/client";

export const POST = async (req: NextRequest) => {
  try {
    const body: ComponentAttribute[] = await req.json();
    const resData = await upsertManyComponentAttribute({ newDataList: body });
    return NextResponse.json<{ data: ComponentAttribute[] }>({
      data: resData,
    }, {
      status: 200,
    })
  } catch (error) {
    console.error(error);
    return NextResponse.json<{ message: string }>({
      message: "Internal server error!",
    }, {
      status: 500,
    });
  }
}
