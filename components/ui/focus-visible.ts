import { colors } from "@/design-tokens/tokens";

export function focusVisibleRule(selector: string) {
  return `${selector} { outline: 3px solid ${colors.focusRing}; outline-offset: 2px; }`;
}
