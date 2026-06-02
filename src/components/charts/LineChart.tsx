'use client';

import {
  CartesianGrid,
  Line,
  LineChart as RechartsLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { ChartPoint } from '@/lib/analytics/types';

const PRIMARY = '#449691';

export function LineChart({
  data,
  height = 260,
  valueFormatter = (v: number) => String(v),
}: {
  data: ChartPoint[];
  height?: number;
  valueFormatter?: (value: number) => string;
}) {
  return (
    <div className="w-full" style={{ minHeight: 200, height }}>
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLine data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 12, fill: '#6B7280' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: '#6B7280' }}
          axisLine={false}
          tickLine={false}
          width={40}
        />
        <Tooltip
          formatter={value => [valueFormatter(Number(value ?? 0)), '']}
          contentStyle={{
            borderRadius: 8,
            border: '1px solid #E5E7EB',
            fontSize: 13,
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke={PRIMARY}
          strokeWidth={2.5}
          dot={{ r: 3, fill: PRIMARY }}
          activeDot={{ r: 5 }}
          isAnimationActive={false}
        />
      </RechartsLine>
    </ResponsiveContainer>
    </div>
  );
}
