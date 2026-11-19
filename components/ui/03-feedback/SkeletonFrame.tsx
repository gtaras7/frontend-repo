import type { CSSProperties, ReactNode } from "react";

import { skeletonMotion } from "@/components/ui/03-feedback/skeleton-motion";
import { visuallyHidden } from "@/components/ui/visually-hidden";

export interface SkeletonFrameProps {
  /** Localized loading announcement for screen readers. */
  label?: string;
  className?: string;
  style?: CSSProperties;
}

export function SkeletonFrame({
  label,
  className,
  style,
  children,
}: SkeletonFrameProps & { children: ReactNode }) {
  return (
    <>
      <style href="cg-skeleton" precedence="components">
        {skeletonMotion.css}
      </style>
      {label ? (
        <span role="status" style={visuallyHidden}>
          {label}
        </span>
      ) : null}
      <div aria-hidden="true" className={className} style={style}>
        {children}
      </div>
    </>
  );
}
