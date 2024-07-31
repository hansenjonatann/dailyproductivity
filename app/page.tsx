"use client";
import ItemCard from "@/components/ItemCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const res = await axios.get("/server/item");
    if (res) {
      setItems(res.data.data);
    }
  };
  useEffect(() => {
    fetchItems();
  }, []);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-2 gap-4  md:grid-cols-2 lg:grid-cols-4">
        <ItemCard items={items} />
      </div>
    </div>
  );
}
