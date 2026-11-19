"use client";

import { useTranslations } from "next-intl";

import { Sidebar, type SidebarNavEntry } from "@/components/ui/04-navigation/Sidebar";
import { AssetIcon } from "@/components/ui/AssetIcon";
import { colors, radius } from "@/design-tokens/tokens";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

import { type ShellScreen, shellScreens } from "./shell-screens";
import { demoShellUser } from "./shell-user";

const sidebarScreens = ["chat", "health", "reminders"] as const satisfies readonly ShellScreen[];
const SettingsIcon = shellScreens.settings.icon;

export function AppSidebar() {
  const t = useTranslations("shell");
  const pathname = usePathname();
  const router = useRouter();

  const nav = sidebarScreens.map((id) => ({
    ...shellScreens[id],
    id,
    label: t(`nav.${id}`),
  })) satisfies SidebarNavEntry[];

  const activeNavId = nav.find(
    (entry) => pathname === entry.href || pathname.startsWith(`${entry.href}/`),
  )?.id;

  // Conversation history arrives with the chat slice.
  return (
    <Sidebar
      logo={<AssetIcon name="partner-logo-white" width={148} height={51} />}
      ctaLabel={t("cta")}
      onCtaClick={() => {
        router.push(shellScreens.chat.href);
      }}
      nav={nav}
      activeNavId={activeNavId}
      recentsLabel={t("recents")}
      user={{ ...demoShellUser, meta: t("userMeta") }}
      footerAction={
        <Link
          href={shellScreens.settings.href}
          aria-label={t("settings")}
          style={styles.settingsLink}
        >
          <SettingsIcon size={18} aria-hidden="true" />
        </Link>
      }
    />
  );
}

const styles = {
  settingsLink: {
    display: "inline-flex",
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    color: colors.textTertiary,
    textDecoration: "none",
  },
} satisfies Record<string, React.CSSProperties>;
