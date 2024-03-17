import { getManyComponentType } from "@/services/databases/component-type";
import { NextResponse, NextRequest } from "next/server";
import { ComponentTypeRelation } from "@/utils/types/params";

export const GET = async (req: NextRequest) => {
  try {
    const resData = await getManyComponentType();
    return NextResponse.json<{ data: ComponentTypeRelation[] }>({
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
