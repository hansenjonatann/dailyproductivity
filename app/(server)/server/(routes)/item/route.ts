import { NextResponse, NextRequest } from "next/server";
import { Item, PrismaClient } from "@prisma/client";
const db = new PrismaClient();

// Using dynamic

export const dynamic = "force-dynamic";

// GET : Take the item data

export const GET = async () => {
  try {
    // create a variable with name is items and assign the  value with item list with category
    const items = await db.item.findMany({
      include: {
        category: true,
      },
    });
    // make a conditional to check the items is exists
    if (items) {
      // return a response with json format if items is exists
      return NextResponse.json({
        status: true,
        statusCode: 200,
        message: "List of Items",
        data: items,
      });
    }

    // make a conditional to check the items is not exists

    if (!items) {
      return NextResponse.json({
        status: false,
        statusCode: 400,
        message: "Fail to fetch item data from database ",
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
    // create a variabel with name is body ( item Type Data) and attempt the value with request in json
    const body: Item = await req.json();

    // create a destructring
    const { name, thumb, url, categoryId, description } = body;
    // create a variabel with name item and attempt the value with the function to store data into database
    const item = await db.item.create({
      data: {
        name: name,
        thumb: thumb,
        url: url,
        categoryId: categoryId,
        description: description,
      },
    });

    // make a condition if the function is success store the item data
    if (item) {
      return NextResponse.json({
        status: true,
        statusCode: 201,
        message: "Create Item Successfully",
        data: item,
      });
    }
    // create a condition if the function is fail
    if (!name || !categoryId || !url) {
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
