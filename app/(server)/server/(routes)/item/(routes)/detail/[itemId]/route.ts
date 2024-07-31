"use server";

import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

// GET : Get the item data include the category with the parameters
export const GET = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      itemId: string;
    };
  }
) => {
  try {
    // create a variable with name is id and attempt the value with params.itemId
    const id = params.itemId;
    // make a conditional if id is exists
    if (id) {
      // create a variable with name is item and attempt the value with the query to get item data by id
      const item = await db.item.findFirst({
        where: {
          id: id,
        },
        include: {
          category: true,
        },
      });

      return NextResponse.json({
        status: true,
        statusCode: 200,
        message: "Detail of Item",
        data: item,
      });

      // make a condition where the item is not exists or id is wrong
    }
    if (!id) {
      return NextResponse.json({
        status: false,
        statusCode: 404,
        message: "Item not found",
      });
    }
  } catch (error) {
    // returns error when have error or no connection
    return NextResponse.json({
      status: false,
      statusCode: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};
