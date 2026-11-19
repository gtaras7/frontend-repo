import { AppSidebar } from "@/components/features/shell/AppSidebar";
import { colors } from "@/design-tokens/tokens";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={styles.root}>
      <AppSidebar />
      <main style={styles.content}>{children}</main>
    </div>
  );
}

const styles = {
  root: {
    display: "flex",
    minHeight: "100dvh",
    maxWidth: "100%",
    overflowX: "hidden",
    backgroundColor: colors.surfacePage,
  },
  content: {
    display: "flex",
    flex: "1 1 0",
    minWidth: 0,
    flexDirection: "column",
  },
} satisfies Record<string, React.CSSProperties>;
