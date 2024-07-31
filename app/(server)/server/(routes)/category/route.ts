import { NextResponse, NextRequest } from "next/server";
import { Category, PrismaClient } from "@prisma/client";
const db = new PrismaClient();

// Using dynamic

export const dynamic = "force-dynamic";

// GET : Take the category data

export const GET = async () => {
  try {
    // create a variable with name is categories and assign the  value with category list
    const categories = await db.category.findMany();
    // make a conditional to check the categories is exists
    if (categories) {
      // return a response with json format if categories is exists
      return NextResponse.json({
        status: true,
        statusCode: 200,
        message: "List of Categories",
        data: categories,
      });
    }

    // make a conditional to check the categories is not exists

    if (!categories) {
      return NextResponse.json({
        status: false,
        statusCode: 400,
        message: "Fail to fetch category data from database ",
      });
    }
  } catch (error) {
    // returns an error if the method is not GET or there is a server error
    return NextResponse.json({
      status: false,
      statusCode: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};

// POST : Create a Category

export const POST = async (req: NextRequest) => {
  try {
    // create a variabel with name is body ( category Type Data) and attempt the value with request in json
    const body: Category = await req.json();

    // create a destructring
    const { name, slug } = body;
    // create a variabel with name category and attempt the value with the function to store data into database
    const category = await db.category.create({
      data: {
        name: name,
        slug: slug,
      },
    });

    // make a condition if the function is success store the category data
    if (category) {
      return NextResponse.json({
        status: true,
        statusCode: 201,
        message: "Create Category Successfully",
        data: category,
      });
    }
    // create a condition if the function is fail
    if (!name || !slug) {
      return NextResponse.json({
        status: false,
        statusCode: 400,
        message: "Please Complete the field ",
      });
    }
  } catch (error) {
    // returns error with the error when the method is not POST or have a problems
    return NextResponse.json({
      status: false,
      statusCode: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};
