import { colors, px, spacing, typography } from "@/design-tokens/tokens";

import { AppLanguageSelector } from "./AppLanguageSelector";
import { type ShellScreen, shellScreens } from "./shell-screens";

interface AppHeaderProps {
  screen: ShellScreen;
  title: string;
  subtitle?: string;
}

export function AppHeader({ screen, title, subtitle }: AppHeaderProps) {
  const Icon = shellScreens[screen].icon;

  return (
    <header style={styles.header}>
      <div style={styles.heading}>
        <span aria-hidden="true" style={styles.iconBox}>
          <Icon size={20} />
        </span>
        <div style={styles.headingCopy}>
          <h1 style={styles.title}>{title}</h1>
          {subtitle !== undefined && <p style={styles.subtitle}>{subtitle}</p>}
        </div>
      </div>

      <div style={styles.language}>
        <AppLanguageSelector />
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: px(spacing[4]),
    minHeight: 72,
    flexShrink: 0,
    padding: `${px(spacing[4])} ${px(spacing[8])}`,
    backgroundColor: colors.surfaceCard,
    borderBottom: `1px solid ${colors.borderSubtle}`,
  },
  heading: {
    display: "flex",
    alignItems: "center",
    gap: px(spacing[3]),
    minWidth: 0,
  },
  iconBox: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    color: colors.textSecondary,
  },
  headingCopy: { display: "flex", flexDirection: "column", gap: 2, minWidth: 0 },
  title: {
    margin: 0,
    color: colors.textPrimary,
    ...typography.textLgSemibold,
  },
  subtitle: {
    margin: 0,
    color: colors.textSecondary,
    ...typography.textXs,
  },
  language: {
    display: "flex",
    flexShrink: 0,
  },
} satisfies Record<string, React.CSSProperties>;
