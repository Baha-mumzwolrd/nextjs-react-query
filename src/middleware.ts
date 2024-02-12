import { chain } from "@/middlewares/chain";
import { cartMiddleware } from "@/middlewares/cartMiddleware";
import { intlMiddleware } from "./middlewares/intlMiddleware";

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(ar|en)/:path*"],
};

const middlewares = [intlMiddleware, cartMiddleware];
export default chain(middlewares);
