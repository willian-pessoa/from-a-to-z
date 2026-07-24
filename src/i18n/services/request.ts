import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  let locale = (await cookies()).get("NEXT_LOCALE")?.value ?? "pt-BR";

  if (!hasLocale(routing.locales, locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
