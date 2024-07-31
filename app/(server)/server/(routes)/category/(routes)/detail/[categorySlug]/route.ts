"use server";

import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

// GET : Get the category data include the items with the parameters
export const GET = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      categorySlug: string;
    };
  }
) => {
  try {
    // create a variable with name is slug and attempt the value with params.categorySlug
    const slug = params.categorySlug;
    // make a conditional if slug is exists
    if (slug) {
      // create a variable with name is category and attempt the value with the query to get category data by id
      const category = await db.category.findFirst({
        where: {
          slug: String(slug),
        },
        include: {
          items: true,
        },
      });

      return NextResponse.json({
        status: true,
        statusCode: 200,
        message: "Detail of Category",
        data: category,
      });

      // make a condition where the category is not exists or slug is wrong
    }
    if (!slug) {
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
