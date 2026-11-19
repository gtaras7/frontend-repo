import { defineRouting } from "next-intl/routing";

// The pilot runs at Agios Loukas in Thessaloniki, so Greek is the default locale.
export const routing = defineRouting({
  locales: ["el", "en"],
  defaultLocale: "el",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
