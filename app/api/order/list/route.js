import connectDB from "@/config/db";
import AddressModel from "@/models/AddressModel";
import OrderModel from "@/models/OrderModel";
import ProductModel from "@/models/ProductModel";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    await connectDB();

    AddressModel.length;
    ProductModel.length;
    const orders = await OrderModel.findById(userId).populate(
      "address items.product"
    );
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
