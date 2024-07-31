"use server";

import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

// DELETE : DELETE the category data where the id is exists and delete the data from database
export const DELETE = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      categoryId: string;
    };
  }
) => {
  try {
    // create a variable with name is id and attempt the value with params.categoryid
    const id = params.categoryId;
    // make a conditional if id is exists
    if (id) {
      // create a variable with name is category and attempt the value with the query to delete category data by id from database
      const category = await db.category.delete({
        where: {
          id: id,
        },
      });

      return NextResponse.json({
        status: true,
        statusCode: 200,
        message: "Delete Category Success",
        data: category,
      });

      // make a condition where the category is not exists or id is wrong
    }
    if (!id) {
      return NextResponse.json({
        status: false,
        statusCode: 404,
        message: "Category not found",
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
