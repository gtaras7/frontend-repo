import { colors, px, radius, typography } from "@/design-tokens/tokens";

/** Figma set `211:755`; use a full-width message row, max bubble width 560px, and never clip text. */
export type ChatSender = "ai" | "user";

export interface ChatBubbleProps {
  sender: ChatSender;
  /** Message body. i18n string (or streamed text). */
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const CHAT_BUBBLE_MAX_WIDTH = 560;

export function ChatBubble({ sender, children, className, style }: ChatBubbleProps) {
  const isUser = sender === "user";

  return (
    <div
      className={className}
      style={{
        ...styles.row,
        justifyContent: isUser ? "flex-end" : "flex-start",
      }}
    >
      <div
        style={{
          ...styles.bubble,
          backgroundColor: isUser ? colors.primaryLight : colors.surfaceCard,
          ...style,
        }}
      >
        <div style={styles.body}>{children}</div>
      </div>
    </div>
  );
}

const styles = {
  row: {
    display: "flex",
    width: "100%",
  },
  bubble: {
    maxWidth: CHAT_BUBBLE_MAX_WIDTH,
    minWidth: 0,
    padding: `${px(14)} ${px(18)}`,
    borderRadius: radius.lg,
  },
  body: {
    margin: 0,
    width: "100%",
    whiteSpace: "pre-wrap",
    overflowWrap: "anywhere",
    ...typography.text14,
    color: colors.textPrimary,
  },
} satisfies Record<string, React.CSSProperties>;
