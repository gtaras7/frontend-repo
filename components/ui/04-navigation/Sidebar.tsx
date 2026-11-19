import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/01-actions/Button";
import { Avatar } from "@/components/ui/04-navigation/Avatar";
import { SidebarNavItem } from "@/components/ui/04-navigation/SidebarNavItem";
import { colors, px, radius, spacing, typography } from "@/design-tokens/tokens";
import type { Link } from "@/i18n/navigation";

export interface SidebarNavEntry {
  id: string;
  label: React.ReactNode;
  icon: LucideIcon;
  /** Destination for link semantics. Preferred over onClick. */
  href?: React.ComponentProps<typeof Link>["href"];
}

export interface SidebarRecent {
  id: string;
  label: React.ReactNode;
}

export interface SidebarUser {
  name: React.ReactNode;
  /** e.g. "Agios Loukas · patient". i18n string. */
  meta: React.ReactNode;
  initials: string;
}

export interface SidebarProps {
  logo: React.ReactNode;
  /** Primary CTA label, e.g. "New conversation". i18n string. */
  ctaLabel: string;
  onCtaClick?: () => void;
  nav: readonly SidebarNavEntry[];
  activeNavId?: string;
  onNavClick?: (id: string) => void;
  /** Section label above the recents, e.g. "RECENT". i18n string. */
  recentsLabel: string;
  recents?: readonly SidebarRecent[];
  onRecentClick?: (id: string) => void;
  user?: SidebarUser;
  /** Optional action at the right of the user footer, e.g. a settings link. */
  footerAction?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const RECENT_GLYPH: React.CSSProperties = {
  width: 15,
  height: 15,
  flexShrink: 0,
  borderRadius: 3,
  backgroundColor: "transparent",
  border: `1.5px solid ${colors.grey400}`,
};

export function Sidebar({
  logo,
  ctaLabel,
  onCtaClick,
  nav,
  activeNavId,
  onNavClick,
  recentsLabel,
  recents = [],
  onRecentClick,
  user,
  footerAction,
  className,
  style,
}: SidebarProps) {
  return (
    <aside className={className} style={{ ...styles.aside, ...style }}>
      <div style={styles.logo}>{logo}</div>

      {/* CTA — 40px primary pill (decision #36), full width via `size="md-compact"`. */}
      <div style={styles.cta}>
        <Button variant="primary" size="md-compact" fullWidth onClick={onCtaClick}>
          {ctaLabel}
        </Button>
      </div>

      <nav style={styles.nav}>
        {nav.map((entry) => {
          const Icon = entry.icon;
          return (
            <SidebarNavItem
              key={entry.id}
              icon={<Icon size={20} />}
              label={entry.label}
              active={entry.id === activeNavId}
              href={entry.href}
              onClick={
                onNavClick === undefined
                  ? undefined
                  : () => {
                      onNavClick(entry.id);
                    }
              }
            />
          );
        })}
      </nav>

      {recents.length > 0 && (
        <div style={styles.recentsHeading}>
          <span style={styles.recentsLabel}>{recentsLabel}</span>
        </div>
      )}
      <div style={styles.recents}>
        {recents.map((recent) => (
          <button
            key={recent.id}
            type="button"
            onClick={
              onRecentClick === undefined
                ? undefined
                : () => {
                    onRecentClick(recent.id);
                  }
            }
            style={styles.recentButton}
          >
            <span aria-hidden="true" style={RECENT_GLYPH} />
            {/* Figma authored #B8B8B9; grey/400 follows drift #34. */}
            <span style={styles.recentLabel}>{recent.label}</span>
          </button>
        ))}
      </div>

      {user !== undefined && (
        <div style={styles.footer}>
          <Avatar initials={user.initials} tone="primary" size="md" style={styles.avatar} />
          <div style={styles.userDetails}>
            <span style={styles.userName}>{user.name}</span>
            <span style={styles.userMeta}>{user.meta}</span>
          </div>
          {footerAction !== undefined && <div style={styles.footerAction}>{footerAction}</div>}
        </div>
      )}
    </aside>
  );
}

const styles = {
  aside: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    width: 264,
    flexShrink: 0,
    overflow: "hidden",
    backgroundColor: colors.neutralDark,
  },
  logo: { display: "flex", padding: `${px(18)} ${px(18)} ${px(14)}` },
  cta: { padding: `${px(spacing[1])} ${px(14)} ${px(14)}` },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    padding: `0 ${px(spacing[2.5])}`,
  },
  recentsHeading: { display: "flex", padding: `${px(spacing[5])} ${px(51)} ${px(spacing[2])}` },
  recentsLabel: {
    ...typography.captionXs,
    letterSpacing: "0.8px",
    color: colors.textTertiary,
  },
  recents: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
    flex: "1 0 0",
    minHeight: 0,
    padding: `0 ${px(spacing[2.5])}`,
  },
  recentButton: {
    display: "flex",
    alignItems: "flex-start",
    gap: px(9),
    width: "100%",
    padding: `${px(spacing[2])} ${px(spacing[3])}`,
    border: "0",
    borderRadius: radius.sm,
    backgroundColor: "transparent",
    color: "inherit",
    cursor: "pointer",
    textAlign: "left",
    font: "inherit",
  },
  recentLabel: { ...typography.textSm, color: colors.grey400 },
  footer: {
    display: "flex",
    alignItems: "center",
    gap: px(spacing[2.5]),
    padding: `${px(spacing[3])} ${px(14)}`,
    backgroundColor: colors.textPrimary,
    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
  },
  avatar: { width: 34, height: 34, borderRadius: 17 },
  userDetails: { display: "flex", flexDirection: "column", gap: 1, minWidth: 0, flex: "1 0 0" },
  userName: { ...typography.textSmMedium, color: colors.baseWhite },
  userMeta: { ...typography.captionXs, color: colors.textTertiary },
  footerAction: { display: "flex", flexShrink: 0, alignItems: "center" },
} satisfies Record<string, React.CSSProperties>;
