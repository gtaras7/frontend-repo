import { getTranslations } from "next-intl/server";

import { AppHeader } from "@/components/features/shell/AppHeader";
import { ScreenPlaceholder } from "@/components/features/shell/ScreenPlaceholder";

export default async function ChatPage() {
  const t = await getTranslations("shell.screens.chat");

  return (
    <>
      <AppHeader screen="chat" title={t("title")} subtitle={t("subtitle")} />
      <ScreenPlaceholder />
    </>
  );
}
