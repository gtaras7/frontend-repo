"use client";

import { hasLocale, useLocale, useTranslations } from "next-intl";

import { LanguageSelector } from "@/components/ui/04-navigation/LanguageSelector";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function AppLanguageSelector() {
  const t = useTranslations("shell.language");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const options = routing.locales.map((value) => ({ value, label: t(value) }));

  return (
    <LanguageSelector
      options={options}
      value={locale}
      label={t("label")}
      onValueChange={(value) => {
        if (hasLocale(routing.locales, value)) {
          router.replace(pathname, { locale: value });
        }
      }}
    />
  );
}
