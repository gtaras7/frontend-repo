export interface LineChartPoint {
  label: string;
  value: number;
}

export function getPlottablePoints(points: readonly LineChartPoint[]) {
  return points.flatMap(({ value }, index) => {
    if (!Number.isFinite(value)) return [];
    const previous = points[index - 1];
    return [
      {
        index,
        value,
        startsSegment: previous === undefined || !Number.isFinite(previous.value),
      },
    ];
  });
}
