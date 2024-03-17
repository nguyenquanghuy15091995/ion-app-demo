import { upsertManyThemeDetail } from "@/services/databases/theme-detail";
import { NextResponse, NextRequest } from "next/server";
import { ThemeDetail } from "@prisma/client";

export const POST = async (req: NextRequest) => {
  try {
    const body: ThemeDetail[] = await req.json();
    const resData = await upsertManyThemeDetail({ newDataList: body });
    return NextResponse.json<{ data: ThemeDetail[] }>({
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
