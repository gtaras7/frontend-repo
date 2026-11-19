import { Bell, HeartPulse, MessageSquare, Settings } from "lucide-react";

import { APP_PATHS } from "@/i18n/app-paths";

export const shellScreens = {
  chat: { href: APP_PATHS.chat, icon: MessageSquare },
  // Figma labels this screen Health. The app routes it through the dashboard.
  health: { href: APP_PATHS.health, icon: HeartPulse },
  reminders: { href: APP_PATHS.reminders, icon: Bell },
  settings: { href: APP_PATHS.settings, icon: Settings },
} as const;

export type ShellScreen = keyof typeof shellScreens;
