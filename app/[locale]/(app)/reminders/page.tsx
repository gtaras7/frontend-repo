import { getTranslations } from "next-intl/server";

import { AppHeader } from "@/components/features/shell/AppHeader";
import { ScreenPlaceholder } from "@/components/features/shell/ScreenPlaceholder";

export default async function RemindersPage() {
  const t = await getTranslations("shell.screens.reminders");

  return (
    <>
      <AppHeader screen="reminders" title={t("title")} />
      <ScreenPlaceholder />
    </>
  );
}
