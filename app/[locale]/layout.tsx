import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";

import { focusVisibleRule } from "@/components/ui/focus-visible";
import { colors } from "@/design-tokens/tokens";
import { routing } from "@/i18n/routing";

const inter = Inter({ subsets: ["latin", "greek"], display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body style={styles.body}>
        {/* Figma's 800+640px onboarding columns use border-box measurements. */}
        <style
          dangerouslySetInnerHTML={{
            __html: `*, *::before, *::after { box-sizing: border-box; }
button, input { font: inherit; }
button { cursor: pointer; }
button:disabled, input:disabled { cursor: not-allowed; }
${focusVisibleRule(":focus-visible")}
a { color: inherit; }`,
          }}
        />
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}

const styles = {
  body: {
    margin: 0,
    backgroundColor: colors.surfacePage,
    color: colors.textPrimary,
    fontFamily: inter.style.fontFamily,
  },
} satisfies Record<string, React.CSSProperties>;
