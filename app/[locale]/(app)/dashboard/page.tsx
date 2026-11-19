import { getTranslations } from "next-intl/server";

import { AppHeader } from "@/components/features/shell/AppHeader";
import { ScreenPlaceholder } from "@/components/features/shell/ScreenPlaceholder";

export default async function DashboardPage() {
  const t = await getTranslations("shell.screens.health");

  return (
    <>
      <AppHeader screen="health" title={t("title")} />
      <ScreenPlaceholder />
    </>
  );
}
