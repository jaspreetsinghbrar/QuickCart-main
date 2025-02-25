import ProductModel from "@/models/ProductModel";
import UserModel from "@/models/UserModel";
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
      return (await acc) + product.OfferPrice * items.quantity;
    }, 0);

    await inngest.send({
      name: "order/created",
      data: {
        userId,
        items,
        address,
        amount: amount + Math.floor(amount * 0.02),
        date: Date.now(),
      },
    });

    //Clear user cart
    const user = await UserModel.findById(userId);
    user.cartItems = {};
    await user.save();

    return NextResponse({ success: true, message: "Order Placed" });
  } catch (error) {
    return NextResponse({ success: false, message: error.message });
  }
}
