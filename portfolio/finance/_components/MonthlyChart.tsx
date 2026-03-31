'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { MonthlyStats, formatILS } from '@/lib/finance/sampleData';

interface TooltipProps {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl p-3 text-sm"
      style={{
        background: 'rgba(10,10,26,0.95)',
        border: '1px solid rgba(139,92,246,0.3)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <p className="text-white/60 text-xs mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 mb-1">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: entry.color }}
          />
          <span className="text-white/70">{entry.name}:</span>
          <span className="text-white font-semibold">{formatILS(entry.value)}</span>
        </div>
      ))}
    </div>
  );
}

interface Props {
  data: MonthlyStats[];
}

export default function MonthlyChart({ data }: Props) {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-white font-semibold mb-1">הכנסות מול הוצאות</h2>
      <p className="text-white/40 text-xs mb-5">סיכום חודשי — ₪</p>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} barGap={4} barCategoryGap="28%">
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
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          <Legend
            wrapperStyle={{ paddingTop: '16px', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}
          />
          <Bar
            name="הכנסות"
            dataKey="income"
            fill="#34d399"
            radius={[4, 4, 0, 0]}
            maxBarSize={36}
          />
          <Bar
            name="הוצאות"
            dataKey="expenses"
            fill="#8b5cf6"
            radius={[4, 4, 0, 0]}
            maxBarSize={36}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
