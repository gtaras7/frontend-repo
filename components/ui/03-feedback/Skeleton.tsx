import { skeletonMotion } from "@/components/ui/03-feedback/skeleton-motion";
import { SkeletonFrame, type SkeletonFrameProps } from "@/components/ui/03-feedback/SkeletonFrame";
import { colors, px, radius, spacing } from "@/design-tokens/tokens";

export type SkeletonProps = SkeletonFrameProps;

const BAR = (height: number): React.CSSProperties => ({
  width: "100%",
  height,
  flexShrink: 0,
  borderRadius: radius.sm,
  backgroundColor: colors.grey200,
  animation: skeletonMotion.animation,
});

export function Skeleton({ label, className, style }: SkeletonProps) {
  return (
    <SkeletonFrame label={label} className={className} style={{ ...styles.root, ...style }}>
      <div className={skeletonMotion.className} style={BAR(14)} />
      <div className={skeletonMotion.className} style={BAR(10)} />
      <div className={skeletonMotion.className} style={BAR(10)} />

      <div style={styles.cards}>
        {[0, 1, 2].map((i) => (
          <div key={i} className={skeletonMotion.className} style={styles.card} />
        ))}
      </div>
    </SkeletonFrame>
  );
}

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    gap: px(spacing[3]),
    padding: px(spacing[5]),
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceCard,
  },
  cards: { display: "flex", gap: px(spacing[3]), height: 90, width: "100%" },
  card: {
    flex: "1 0 0",
    height: "100%",
    borderRadius: radius.sm,
    backgroundColor: colors.grey200,
    animation: skeletonMotion.animation,
  },
} satisfies Record<string, React.CSSProperties>;
