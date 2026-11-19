import { colors, px, spacing, typography } from "@/design-tokens/tokens";
import { Link } from "@/i18n/navigation";

export interface SidebarNavItemProps {
  icon: React.ReactNode;
  label: React.ReactNode;
  active?: boolean;
  /** Destination for link semantics. Preferred over onClick. */
  href?: React.ComponentProps<typeof Link>["href"];
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function SidebarNavItem({
  icon,
  label,
  active = false,
  href,
  onClick,
  className,
  style,
}: SidebarNavItemProps) {
  const color = active ? colors.primary : colors.grey400;
  const content = (
    <>
      <span aria-hidden="true" style={{ ...styles.iconBox, color }}>
        {icon}
      </span>
      <span
        style={{
          ...styles.label,
          ...(active ? typography.textSmSemibold : typography.textSm),
          color,
        }}
      >
        {label}
      </span>
    </>
  );

  const boxStyle = {
    ...styles.box,
    backgroundColor: active ? colors.surfaceCard : "transparent",
    ...style,
  };

  if (href !== undefined) {
    return (
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={className}
        style={boxStyle}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={className}
      style={{ ...boxStyle, border: "0", font: "inherit" }}
    >
      {content}
    </button>
  );
}

const styles = {
  iconBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 20,
    flexShrink: 0,
  },
  label: {
    whiteSpace: "nowrap",
  },
  box: {
    display: "flex",
    alignItems: "center",
    gap: px(spacing[3]),
    width: "100%",
    padding: `${px(spacing[2])} ${px(spacing[2.5])}`,
    // Figma authors 8px; the radius scale (xs 4 / sm 6 / md 10 / lg 14 / xl 12 / full 999)
    borderRadius: 8,
    color: "inherit",
    textDecoration: "none",
    cursor: "pointer",
  },
} satisfies Record<string, React.CSSProperties>;
