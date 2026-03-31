'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import { MonthlyStats, formatILS } from '@/lib/finance/sampleData';

interface TooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const val = payload[0].value;
  const positive = val >= 0;
  return (
    <div
      className="rounded-xl p-3 text-sm"
      style={{
        background: 'rgba(10,10,26,0.95)',
        border: '1px solid rgba(139,92,246,0.3)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <p className="text-white/60 text-xs mb-1">{label}</p>
      <p
        className="font-semibold"
        style={{ color: positive ? '#34d399' : '#f87171' }}
      >
        {positive ? '+' : ''}{formatILS(val)}
      </p>
    </div>
  );
}

interface Props {
  data: MonthlyStats[];
}

export default function SavingsChart({ data }: Props) {
  const cumulativeData = data.reduce<(MonthlyStats & { cumulative: number })[]>(
    (acc, cur, i) => {
      const prev = acc[i - 1]?.cumulative ?? 0;
      return [...acc, { ...cur, cumulative: prev + cur.savings }];
    },
    []
  );

  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-white font-semibold mb-1">מגמת חסכונות</h2>
      <p className="text-white/40 text-xs mb-5">חיסכון חודשי נטו + מצטבר — ₪</p>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={cumulativeData}>
          <defs>
            <linearGradient id="savingsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="cumulativeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#34d399" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#34d399" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.05)"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₪${(v / 1000).toFixed(0)}k`}
            width={50}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(139,92,246,0.3)', strokeWidth: 1 }} />
          <ReferenceLine y={0} stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4" />
          <Area
            type="monotone"
            dataKey="savings"
            name="חיסכון חודשי"
            stroke="#8b5cf6"
            strokeWidth={2}
            fill="url(#savingsGrad)"
            dot={{ fill: '#8b5cf6', r: 3, strokeWidth: 0 }}
          />
          <Area
            type="monotone"
            dataKey="cumulative"
            name="מצטבר"
            stroke="#34d399"
            strokeWidth={2}
            fill="url(#cumulativeGrad)"
            dot={{ fill: '#34d399', r: 3, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
