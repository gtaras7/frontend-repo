import { notFound } from "next/navigation";
import * as rootParams from "next/root-params";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import type greekMessages from "./el.json";
import type englishMessages from "./en.json";
import { type Locale, routing } from "./routing";

type MessageCatalog = typeof greekMessages & typeof englishMessages;

const messageLoaders = {
  el: () => import("./el.json"),
  en: () => import("./en.json"),
} satisfies Record<Locale, () => Promise<{ default: MessageCatalog }>>;

// Next 16.3 root params expose the locale to deep Server Components without setRequestLocale.
export default getRequestConfig(async () => {
  const locale = await rootParams.locale();

  if (!hasLocale(routing.locales, locale)) {
    // Requests such as `/foo.txt` bypass locale negotiation but still match `[locale]`.
    notFound();
  }

  const { default: messages } = await messageLoaders[locale]();

  return { locale, messages };
});
