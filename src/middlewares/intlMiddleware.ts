import { type NextFetchEvent, type NextRequest } from "next/server";

import { CustomMiddleware } from "./chain";
import createIntlMiddleware from "next-intl/middleware";
import { locales, localePrefix } from "@/navigation";
// import { createI18nMiddleware } from "next-international/middleware";

export function intlMiddleware(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const handleI18nRouting = createIntlMiddleware({
      defaultLocale: "en",
      localePrefix,
      locales,
      localeDetection: true,
    });

    const response = handleI18nRouting(request);

    return middleware(request, event, response);
  };
}
