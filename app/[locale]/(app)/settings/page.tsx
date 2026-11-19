import { getTranslations } from "next-intl/server";

import { AppHeader } from "@/components/features/shell/AppHeader";
import { ScreenPlaceholder } from "@/components/features/shell/ScreenPlaceholder";

export default async function SettingsPage() {
  const t = await getTranslations("shell.screens.settings");

  return (
    <>
      <AppHeader screen="settings" title={t("title")} />
      <ScreenPlaceholder />
    </>
  );
}
