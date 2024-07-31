"use server";

import { NextResponse, NextRequest } from "next/server";
import { Item, PrismaClient } from "@prisma/client";
const db = new PrismaClient();

// PATCH : Update the item data where the id is exists and update the data from body
export const PATCH = async (
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
      const body: Item = await req.json();

      const { name, description, url } = body;
      // create a variable with name is item and attempt the value with the query to update item data by id
      const item = await db.item.update({
        where: {
          id: id,
        },
        data: {
          name: name,
          description: description,
          url: url,
        },
      });

      return NextResponse.json({
        status: true,
        statusCode: 200,
        message: "Update Item Success",
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
