import { getPlottablePoints, type LineChartPoint } from "@/components/ui/05-data/line-chart-points";
import { visuallyHidden } from "@/components/ui/visually-hidden";
import { colors } from "@/design-tokens/tokens";

export type { LineChartPoint } from "@/components/ui/05-data/line-chart-points";

export interface LineChartSeries {
  /** i18n string, e.g. "Systolic BP". Used in the accessible summary. */
  name: string;
  points: readonly LineChartPoint[];
  kind?: "primary" | "comparison";
}

export interface LineChartProps {
  series: readonly LineChartSeries[];
  /** Y-axis ticks, bottom to top, e.g. [60, 90, 120, 150]. */
  ticks: readonly number[];
  /** i18n summary of the data for screen readers, e.g.
   *  "Systolic blood pressure over the last 7 days: 128 on Monday down to 118 on Sunday." */
  accessibleSummary: string;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function LineChart({
  series,
  ticks,
  accessibleSummary,
  height = 180,
  className,
  style,
}: LineChartProps) {
  const plotLeft = 7.75; // % insets from the Figma mock
  const plotRight = 3.1;
  const plotTop = 5.65;
  const plotBottom = 10;

  const finiteTicks = ticks.filter((t) => Number.isFinite(t));
  const seriesValues = series
    .flatMap((s) => s.points.map((p) => p.value))
    .filter((v) => Number.isFinite(v));
  const domainValues = finiteTicks.length > 0 ? finiteTicks : seriesValues;

  const min = domainValues.length > 0 ? Math.min(...domainValues) : 0;
  const rawMax = domainValues.length > 0 ? Math.max(...domainValues) : 100;
  const max = rawMax === min ? min + 1 : rawMax;
  const range = max - min;

  const yPct = (v: number) => plotTop + (1 - (v - min) / range) * (100 - plotTop - plotBottom);
  const xPct = (i: number, count: number) =>
    plotLeft +
    (count <= 1
      ? (100 - plotLeft - plotRight) / 2
      : (i / (count - 1)) * (100 - plotLeft - plotRight));
  const firstSeries = series[0];

  return (
    <figure className={className} style={{ ...styles.figure, height, ...style }}>
      <svg
        role="img"
        aria-label={accessibleSummary}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={styles.svg}
      >
        {finiteTicks.map((tick) => (
          <line
            key={tick}
            x1={plotLeft}
            x2={100 - plotRight}
            y1={yPct(tick)}
            y2={yPct(tick)}
            stroke={colors.chart.grid}
            strokeWidth={0.3}
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {series.map((s) => {
          const n = s.points.length;
          const points = getPlottablePoints(s.points).map(({ value, index, startsSegment }) => ({
            index,
            x: xPct(index, n),
            y: yPct(value),
            startsSegment,
          }));
          const d = points
            .map(
              ({ x, y, startsSegment }) => `${startsSegment ? "M" : "L"} ${String(x)} ${String(y)}`,
            )
            .join(" ");
          const isComparison = s.kind === "comparison";

          return (
            <g key={s.name}>
              <path
                d={d}
                fill="none"
                stroke={isComparison ? colors.grey400 : colors.chart.series2}
                strokeWidth={isComparison ? 2.5 : 1.5}
                strokeDasharray={isComparison ? "4 3" : undefined}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
              {!isComparison &&
                points.map(({ index, x, y }) => (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r={0.7}
                    fill={colors.chart.series1}
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
            </g>
          );
        })}
      </svg>

      {/* Y-axis labels (HTML so they stay crisp and i18n-able) */}
      {finiteTicks.map((tick) => (
        <span
          key={`yl-${String(tick)}`}
          aria-hidden="true"
          style={{ ...styles.yAxisLabel, top: `${String(yPct(tick))}%` }}
        >
          {tick}
        </span>
      ))}

      {firstSeries === undefined
        ? null
        : firstSeries.points.map((p, i, arr) => (
            <span
              key={`xl-${String(i)}-${p.label}`}
              aria-hidden="true"
              style={{ ...styles.xAxisLabel, left: `${String(xPct(i, arr.length))}%` }}
            >
              {p.label}
            </span>
          ))}

      <figcaption style={visuallyHidden}>{accessibleSummary}</figcaption>
    </figure>
  );
}

const styles = {
  figure: {
    position: "relative",
    width: "100%",
    margin: 0,
  },
  svg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    overflow: "visible",
  },
  yAxisLabel: {
    position: "absolute",
    left: 0,
    transform: "translateY(-50%)",
    fontSize: 10,
    lineHeight: 1,
    color: colors.chart.axis,
  },
  xAxisLabel: {
    position: "absolute",
    bottom: 0,
    transform: "translateX(-50%)",
    fontSize: 10,
    lineHeight: 1,
    color: colors.chart.axis,
    whiteSpace: "nowrap",
  },
} satisfies Record<string, React.CSSProperties>;
