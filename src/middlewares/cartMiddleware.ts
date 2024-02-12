import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";

import { CustomMiddleware } from "./chain";
import { cookies } from "next/headers";
// import { createCart } from "@/app/lib/actions/cart";

export function cartMiddleware(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    // if (!cookies().get("cartId")) {
    //   const newCart = await createCart();
    //   response.cookies.set("cartId", newCart.cartId);
    //   response.headers.set("cartId", newCart.cartId);
    // }

    // if (!cookies().get("sessionsId")) {
    //   response.cookies.set("sessionsId", crypto.randomUUID());
    // }
    // Call the next middleware and pass the request and response
    return middleware(request, event, response);
  };
}
