import { expect, test } from "@playwright/test";

import { getPlottablePoints } from "../components/ui/05-data/line-chart-points";

test("missing readings leave a gap in the chart and retain their place on the time axis", () => {
  const readings = [
    { label: "Monday", value: 90 },
    { label: "Tuesday", value: Number.NaN },
    { label: "Wednesday", value: 110 },
    { label: "Thursday", value: 100 },
  ];

  expect(getPlottablePoints(readings)).toEqual([
    { index: 0, value: 90, startsSegment: true },
    { index: 2, value: 110, startsSegment: true },
    { index: 3, value: 100, startsSegment: false },
  ]);
});
