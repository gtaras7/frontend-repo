const className = "cg-skeleton-bar";

// Figma is static; pulse behavior follows design decision #32.
export const skeletonMotion = {
  className,
  animation: "cg-skeleton-pulse 1.5s ease-in-out infinite",
  css: `
@keyframes cg-skeleton-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.55; }
}
@media (prefers-reduced-motion: reduce) {
  .${className} { animation: none !important; }
}
`,
} as const;
