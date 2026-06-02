'use client';

import {
  Bar,
  BarChart as RechartsBar,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { StackedChartPoint } from '@/lib/analytics/types';

const COLORS = ['#449691', '#F4A261', '#DC2626'];

export function StackedBarChart({
  data,
  series,
  height = 260,
}: {
  data: StackedChartPoint[];
  series: { key: string; label: string }[];
  height?: number;
}) {
  return (
    <div className="w-full" style={{ minHeight: 200, height }}>
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBar data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 12, fill: '#6B7280' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} width={40} />
        <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 13 }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        {series.map((s, i) => (
          <Bar
            key={s.key}
            dataKey={s.key}
            name={s.label}
            stackId="a"
            fill={COLORS[i % COLORS.length]}
            radius={i === series.length - 1 ? [6, 6, 0, 0] : undefined}
            isAnimationActive={false}
          />
        ))}
      </RechartsBar>
    </ResponsiveContainer>
    </div>
  );
}
