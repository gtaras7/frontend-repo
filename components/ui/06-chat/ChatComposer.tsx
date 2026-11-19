import { Plus, Send } from "lucide-react";

import {
  colors,
  px,
  radius,
  shadowCss,
  shadows,
  spacing,
  typography,
} from "@/design-tokens/tokens";

/**
 * Figma disclaimer treatment follows interim decision #50; design owns the final treatment.
 * The disclaimer is a safety boundary and must render whenever the composer renders.
 */
export interface ComposerSuggestion {
  id: string;
  label: React.ReactNode;
}

export interface ChatComposerProps {
  value: string;
  onValueChange: (value: string) => void;
  onSubmit: (value: string) => void;
  /** Placeholder, e.g. "Message CardioGuard…". i18n string. */
  placeholder: string;
  /** Mandatory safety line under the input. i18n string. */
  disclaimer: React.ReactNode;
  suggestions?: readonly ComposerSuggestion[];
  onSuggestionClick?: (id: string) => void;
  /**
   * When set with `attachLabel`, shows the attachment (plus) button.
   * Omit both until attach is wired at the call site.
   */
  onAttach?: () => void;
  /** Accessible name for the attachment (plus) button. i18n string. Required with `onAttach`. */
  attachLabel?: string;
  /** Accessible name for the send button. i18n string. */
  sendLabel: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function ChatComposer({
  value,
  onValueChange,
  onSubmit,
  placeholder,
  disclaimer,
  suggestions = [],
  onSuggestionClick,
  onAttach,
  attachLabel,
  sendLabel,
  disabled = false,
  className,
  style,
}: ChatComposerProps) {
  const canSend = !disabled && value.trim().length > 0;
  const showAttach = onAttach !== undefined && attachLabel !== undefined;
  const showSuggestions = onSuggestionClick !== undefined && suggestions.length > 0;

  return (
    <form
      className={className}
      style={{ ...styles.root, ...style }}
      onSubmit={(event) => {
        event.preventDefault();
        if (canSend) onSubmit(value);
      }}
    >
      {showSuggestions && (
        <div style={styles.suggestions}>
          {suggestions.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                onSuggestionClick(s.id);
              }}
              disabled={disabled}
              style={{
                ...styles.suggestion,
                cursor: disabled ? "not-allowed" : "pointer",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      <div style={styles.inputBar}>
        {showAttach ? (
          <button
            type="button"
            aria-label={attachLabel}
            disabled={disabled}
            onClick={onAttach}
            style={{
              ...styles.attach,
              cursor: disabled ? "not-allowed" : "pointer",
            }}
          >
            <Plus size={20} aria-hidden="true" />
          </button>
        ) : null}

        <textarea
          aria-label={placeholder}
          value={value}
          disabled={disabled}
          rows={1}
          onChange={(event) => {
            onValueChange(event.target.value);
          }}
          onKeyDown={(event) => {
            if (
              event.key === "Enter" &&
              !event.shiftKey &&
              !event.nativeEvent.isComposing &&
              canSend
            ) {
              event.preventDefault();
              event.currentTarget.form?.requestSubmit();
            }
          }}
          placeholder={placeholder}
          style={styles.textarea}
        />

        <button
          type="submit"
          aria-label={sendLabel}
          disabled={!canSend}
          style={{
            ...styles.send,
            backgroundColor: canSend ? colors.primary : colors.grey200,
            color: canSend ? colors.baseWhite : colors.grey400,
            cursor: canSend ? "pointer" : "not-allowed",
          }}
        >
          <Send size={18} aria-hidden="true" />
        </button>
      </div>

      <p style={styles.disclaimer}>{disclaimer}</p>
    </form>
  );
}

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: px(spacing[2.5]),
    width: "100%",
  },
  suggestions: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    gap: px(spacing[2]),
    width: "100%",
  },
  suggestion: {
    display: "inline-flex",
    alignItems: "flex-start",
    padding: `${px(spacing[1.5])} ${px(13)}`,
    border: `1px solid ${colors.primary}`,
    borderRadius: radius.full,
    backgroundColor: colors.primaryLight,
    color: colors.primary,
    ...typography.textSmMedium,
  },
  attach: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: px(spacing[2.5]),
    flexShrink: 0,
    border: "0",
    borderRadius: radius.md,
    backgroundColor: colors.grey100,
    color: colors.textSecondary,
  },
  send: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: px(spacing[2.5]),
    flexShrink: 0,
    border: "0",
    borderRadius: radius.md,
  },
  inputBar: {
    display: "flex",
    alignItems: "flex-start",
    gap: px(spacing[2.5]),
    width: "100%",
    padding: px(spacing[2]),
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceCard,
    border: `1px solid ${colors.borderDefault}`,
    boxShadow: shadowCss(shadows.sm),
  },
  textarea: {
    flex: "1 0 0",
    minWidth: 0,
    resize: "none",
    border: "0",
    backgroundColor: "transparent",
    padding: 0,
    marginTop: px(2),
    color: colors.textPrimary,
    ...typography.textMd,
  },
  disclaimer: {
    margin: 0,
    alignSelf: "flex-start",
    ...typography.textSm,
    color: colors.textSecondary,
  },
} satisfies Record<string, React.CSSProperties>;
