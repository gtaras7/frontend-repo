export const ONBOARDING_ROUTES = {
  splash: "/onboarding",
  welcome: "/onboarding/welcome",
  consent: "/onboarding/consent",
  register: "/register",
  guest: "/onboarding/guest",
  baseline: "/onboarding/baseline",
  age: "/onboarding/baseline/age",
  health: "/onboarding/baseline/health",
  lifestyle: "/onboarding/baseline/lifestyle",
  goals: "/onboarding/baseline/goals",
  permissions: "/onboarding/permissions",
  preparation: "/onboarding/preparation",
  summary: "/onboarding/summary",
  firstRunDashboard: "/onboarding/dashboard",
  dashboard: "/dashboard",
} as const;

const routes = ONBOARDING_ROUTES;

export const SKIPPED_DASHBOARD = {
  pathname: routes.firstRunDashboard,
  query: { profile: "empty" },
};

// Only mounted screens have transitions. A submit transition cannot be an arrow link.
export const ONBOARDING_TRANSITIONS = {
  [routes.splash]: { to: routes.welcome, via: "link" },
  [routes.welcome]: { to: routes.consent, via: "link" },
  [routes.consent]: { to: routes.register, via: "submit" },
  [routes.register]: { to: routes.age, via: "submit" },
  [routes.age]: { to: routes.health, via: "submit" },
  [routes.health]: { to: routes.lifestyle, via: "submit" },
  [routes.lifestyle]: { to: routes.goals, via: "submit" },
  [routes.goals]: { to: routes.permissions, via: "submit" },
  [routes.permissions]: { to: routes.preparation, via: "submit" },
} as const;

// Figma progress includes planned screens and keeps sub-screens on their parent step.
const DISPLAY_STEPS: readonly { paths: readonly string[]; exact?: boolean }[] = [
  { paths: [routes.splash], exact: true },
  { paths: [routes.welcome] },
  { paths: [routes.consent] },
  { paths: [routes.register, routes.guest] },
  { paths: [routes.baseline] },
  { paths: [routes.permissions] },
  { paths: [routes.preparation] },
  { paths: [routes.summary] },
  { paths: [routes.firstRunDashboard, routes.dashboard] },
];

export const ONBOARDING_TOTAL_STEPS = DISPLAY_STEPS.length;

export function getOnboardingStep(pathname: string): number | undefined {
  const normalizedPath = pathname.replace(/\/+$/, "");
  const index = DISPLAY_STEPS.findIndex(({ paths, exact }) =>
    paths.some(
      (path) => normalizedPath === path || (!exact && normalizedPath.startsWith(`${path}/`)),
    ),
  );
  return index === -1 ? undefined : index + 1;
}

export function getOnboardingArrows(pathname: string) {
  const transitions = Object.entries(ONBOARDING_TRANSITIONS);
  const previous = transitions.find(([, transition]) => transition.to === pathname)?.[0];
  const next = transitions.find(([from]) => from === pathname)?.[1];
  return { previous, next: next?.via === "link" ? next.to : undefined };
}
