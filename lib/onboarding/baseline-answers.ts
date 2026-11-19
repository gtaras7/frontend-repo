export const AGE_BANDS = ["under35", "35to44", "45to54", "55to64", "65plus"] as const;
export type AgeBand = (typeof AGE_BANDS)[number];
export type BaselineAnswer<T> = { status: "reported"; value: T } | { status: "missing" };

export const HEALTH_CONDITIONS = [
  "bloodPressure",
  "cholesterol",
  "diabetes",
  "heartCondition",
  "none",
] as const;
export const ACTIVITY_LEVELS = ["inactive", "light", "moderate", "very"] as const;
export const SMOKING_OPTIONS = ["no", "yes", "preferNotToSay"] as const;
export const BASELINE_GOALS = [
  "riskFactors",
  "bloodPressure",
  "cholesterol",
  "activity",
  "nutrition",
  "stress",
] as const;

export type HealthCondition = (typeof HEALTH_CONDITIONS)[number];
export type ActivityLevel = (typeof ACTIVITY_LEVELS)[number];
export type SmokingOption = (typeof SMOKING_OPTIONS)[number];
export type BaselineGoal = (typeof BASELINE_GOALS)[number];
interface BaselineValues {
  age: AgeBand;
  health: {
    conditions: BaselineAnswer<readonly HealthCondition[]>;
    height: BaselineAnswer<number>;
  };
  lifestyle: {
    activity: BaselineAnswer<ActivityLevel>;
    smoking: BaselineAnswer<SmokingOption>;
  };
  goals: readonly BaselineGoal[];
}

export type BaselineStep = keyof BaselineValues;
export type BaselineValue<Step extends BaselineStep> = BaselineValues[Step];
export type BaselineAnswerFor<Step extends BaselineStep> = BaselineAnswer<BaselineValue<Step>>;

export function optionalAnswer<T>(value: T | undefined): BaselineAnswer<T> {
  return value === undefined ? { status: "missing" } : { status: "reported", value };
}

export const HEIGHT_MIN = 120;
export const HEIGHT_MAX = 230;

export function isValidHeight(value: number): boolean {
  return Number.isFinite(value) && value >= HEIGHT_MIN && value <= HEIGHT_MAX;
}
