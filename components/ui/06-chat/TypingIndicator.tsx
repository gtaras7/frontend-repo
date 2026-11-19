import { colors, px, radius, spacing } from "@/design-tokens/tokens";

export interface TypingIndicatorProps {
  /** Accessible label, e.g. "CardioGuard is typing". i18n string. */
  label: string;
  className?: string;
  style?: React.CSSProperties;
}

const DOT_KEYFRAMES = `
@keyframes cg-typing {
  0%, 60%, 100% { opacity: 0.3; }
  30% { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .cg-typing-dot { animation: none !important; }
}
`;

export function TypingIndicator({ label, className, style }: TypingIndicatorProps) {
  return (
    <>
      <style href="cardioguard-typing-indicator" precedence="components">
        {DOT_KEYFRAMES}
      </style>
      <div
        role="status"
        aria-label={label}
        className={className}
        style={{ ...styles.root, ...style }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            aria-hidden="true"
            className="cg-typing-dot"
            style={{
              ...styles.dot,
              animationDelay: `${String(i * 150)}ms`,
            }}
          />
        ))}
      </div>
    </>
  );
}

const styles = {
  root: {
    display: "inline-flex",
    alignItems: "center",
    gap: px(spacing[1.5]),
    padding: px(spacing[4]),
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceCard,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.grey400,
    animation: "cg-typing 1.2s ease-in-out infinite",
  },
} satisfies Record<string, React.CSSProperties>;
