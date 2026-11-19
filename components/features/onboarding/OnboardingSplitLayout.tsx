import { colors, px, shadowCss, shadows, spacing } from "@/design-tokens/tokens";

// Drift W5 and W17 preserve the desktop split and let columns wrap on narrow screens.
export function OnboardingSplitLayout({
  brand,
  children,
  content = "center",
}: {
  brand: React.ReactNode;
  children: React.ReactNode;
  content?: "center" | "summary" | "dashboard";
}) {
  return (
    <div style={styles.div}>
      {brand}
      <main
        style={
          content === "center"
            ? styles.main
            : {
                ...styles.main,
                ...styles.results,
                alignItems: content === "summary" ? "flex-start" : "center",
              }
        }
      >
        {children}
      </main>
    </div>
  );
}

const styles = {
  div: {
    display: "flex",
    flexWrap: "wrap",
    minHeight: "100dvh",
    maxWidth: "100%",
    overflowX: "hidden",
    backgroundColor: colors.surfacePage,
  },
  main: {
    display: "flex",
    // The 400px floor triggers wrapping near 900px. A percentage floor would defeat the clamp.
    width: "clamp(400px, 44.4%, 640px)",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    maxWidth: "100%",
    padding: "clamp(24px, 3.33vw, 48px) clamp(24px, 4.44vw, 64px)",
    backgroundColor: colors.surfaceCard,
    boxShadow: shadowCss(shadows.lg),
  },
  // Drift W27: the summary and dashboard panels have 56px horizontal padding at 1440px.
  results: {
    padding: `clamp(${px(spacing[6])}, 3.33vw, ${px(spacing[12])}) clamp(${px(spacing[6])}, 3.89vw, ${px(56)}) clamp(${px(spacing[6])}, 2.78vw, ${px(spacing[10])})`,
  },
} satisfies Record<string, React.CSSProperties>;
