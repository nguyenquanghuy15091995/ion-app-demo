import { getLayoutType } from "@/services/databases/layout-type";
import { NextResponse, NextRequest } from "next/server";
import { LayoutType } from "@prisma/client";

export const GET = async (req: NextRequest) => {
  try {
    const resData = await getLayoutType();
    return NextResponse.json<{ data: LayoutType | null }>({
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
