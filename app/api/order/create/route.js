import ProductModel from "@/models/ProductModel";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const { address, items } = await request.json();

    if (!address || items.length === 0) {
      return NextResponse.json({ success: false, message: "Invalid data " });
    }

    //calculate order amount using items
    const amount = await items.reduce(async (acc, items) => {
      const product = await ProductModel.findById(items.product);
      return acc + product.OfferPrice * items.quantity;
    }, 0);
  } catch (error) {}
}
