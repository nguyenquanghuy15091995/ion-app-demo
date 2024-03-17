import { getTheme } from "@/services/databases/theme";
import { NextResponse, NextRequest } from "next/server";
import { Theme } from "@prisma/client";

export const GET = async (req: NextRequest) => {
  try {
    const resData = await getTheme();
    return NextResponse.json<{ data: Theme | null }>({
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
