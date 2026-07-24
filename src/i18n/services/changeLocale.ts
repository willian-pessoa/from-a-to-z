"use client";

import { useRouter } from "next/navigation";
import { AppLocale } from "./routing";

const router = useRouter();

export function changeLocale(locale: AppLocale) {
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;

  router.refresh();
}
