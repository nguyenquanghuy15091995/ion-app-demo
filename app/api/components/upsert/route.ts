import { upsertManyComponent } from "@/services/databases/component";
import { NextResponse, NextRequest } from "next/server";
import { Component } from "@prisma/client";

export const POST = async (req: NextRequest) => {
  try {
    const body: Component[] = await req.json();
    const resData = await upsertManyComponent({ newDataList: body });
    return NextResponse.json<{ data: Component[] }>({
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
