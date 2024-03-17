import { getManyThemeDetailByThemeId } from "@/services/databases/theme-detail";
import { NextResponse, NextRequest } from "next/server";
import { ThemeDetailRelation } from "@/utils/types/params";

type DynamicRoute = {
  params: {
    slug: string;
  }
}

export const GET = async (req: NextRequest, dynamicRoute: DynamicRoute) => {
  try {
    const resData = await getManyThemeDetailByThemeId({ themeId: parseInt(dynamicRoute.params.slug) });
    return NextResponse.json<{ data: ThemeDetailRelation[] }>({
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
