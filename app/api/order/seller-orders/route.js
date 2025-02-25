import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import AddressModel from "@/models/AddressModel";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    const isSeller = await authSeller(userId);

    if (!isSeller) {
      return NextResponse.json({ success: false, message: "Not authorized" });
    }
    await connectDB();
    AddressModel.length;
    const orders = await OrderModel.find().populate("address items.product");
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
