import { getAuth } from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import UserModel from "@/models/UserModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);

    const { cartData } = await request.json();

    await connectDB();
    const user = await UserModel.findById(userId);

    user.cartItems = cartData;
    user.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
