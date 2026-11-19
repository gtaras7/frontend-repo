import type { CSSProperties } from "react";

import { ICON_SVGS, type IconName } from "@/design-tokens/icons/icons-figma";

interface AssetIconProps {
  name: IconName;
  size?: number;
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  label?: string;
}

export function AssetIcon({ name, size, width, height, color, className, label }: AssetIconProps) {
  const html = ICON_SVGS[name].replace(/^<svg\b[^>]*>/, (tag) =>
    tag.replace(/\b(width|height)="[^"]*"/g, '$1="100%"'),
  );
  const box: CSSProperties =
    width !== undefined && height !== undefined ? { width, height } : { width: size, height: size };
  const wrapper: CSSProperties = { display: "inline-flex", color, ...box };

  return (
    <span
      role={label === undefined ? undefined : "img"}
      aria-hidden={label === undefined ? true : undefined}
      aria-label={label}
      className={className}
      style={wrapper}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
