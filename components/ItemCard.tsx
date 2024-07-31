"use client";

import Link from "next/link";

interface ItemCardProps {
  items: any;
}

const ItemCard = ({ items }: ItemCardProps) => {
  return (
    <>
      {items.map((item: any, index: number) => (
        <Link key={index} href={`https://${item.url}`}>
          <div className="  bg-white  rounded-md shadow-lg w-56 h-64 ">
            <div className=" flex flex-col">
              <div className="mx-auto mt-2 rounded-xl">
                <img src="https://picsum.photos/200" />
                <div className="flex mt-2 flex-col">
                  <div className="flex justify-between">
                    <div className="">
                      <h1 className="text-black text-lg font-bold">
                        {item.name}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default ItemCard;
