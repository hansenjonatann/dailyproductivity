"use server";

import { NextResponse, NextRequest } from "next/server";
import { Category, PrismaClient } from "@prisma/client";
const db = new PrismaClient();

// PATCH : Update the category data where the id is exists and update the data from body
export const PATCH = async (
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
      const body: Category = await req.json();

      const { name, slug } = body;
      // create a variable with name is category and attempt the value with the query to get category data by id
      const category = await db.category.update({
        where: {
          id: id,
        },
        data: {
          name: name,
          slug: slug,
        },
      });

      return NextResponse.json({
        status: true,
        statusCode: 200,
        message: "Update Category Success",
        data: category,
      });

      // make a condition where the category is not exists or slug is wrong
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
