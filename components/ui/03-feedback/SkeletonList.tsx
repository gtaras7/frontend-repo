import { skeletonMotion } from "@/components/ui/03-feedback/skeleton-motion";
import { SkeletonFrame, type SkeletonFrameProps } from "@/components/ui/03-feedback/SkeletonFrame";
import { colors, px, radius, spacing } from "@/design-tokens/tokens";

export interface SkeletonListProps extends SkeletonFrameProps {
  /** Row widths as CSS lengths, first to last. Defaults to Figma's proportions. */
  rows?: string[];
}

const DEFAULT_ROWS = ["100%", "100%", "100%", "100%", "67%"];

export function SkeletonList({ rows = DEFAULT_ROWS, label, className, style }: SkeletonListProps) {
  return (
    <SkeletonFrame label={label} className={className} style={{ ...styles.root, ...style }}>
      {rows.map((width, i) => (
        <div key={i} className={skeletonMotion.className} style={{ ...styles.bar, width }} />
      ))}
    </SkeletonFrame>
  );
}

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    gap: px(spacing[3]),
  },
  bar: {
    height: 12,
    flexShrink: 0,
    borderRadius: radius.sm,
    backgroundColor: colors.grey100,
    animation: skeletonMotion.animation,
  },
} satisfies Record<string, React.CSSProperties>;
