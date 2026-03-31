'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { formatILS } from '@/lib/finance/sampleData';

interface CategoryData {
  category: string;
  amount: number;
  color: string;
}

interface TooltipProps {
  active?: boolean;
  payload?: { name: string; value: number; payload: CategoryData }[];
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div
      className="rounded-xl p-3 text-sm"
      style={{
        background: 'rgba(10,10,26,0.95)',
        border: '1px solid rgba(139,92,246,0.3)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <p className="text-white font-semibold">{item.name}</p>
      <p className="text-white/60 mt-0.5">{formatILS(item.value)}</p>
    </div>
  );
}

function CustomLegend({ data }: { data: CategoryData[] }) {
  const top8 = data.slice(0, 8);
  return (
    <div className="flex flex-col gap-2 mt-4">
      {top8.map((item) => (
        <div key={item.category} className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ background: item.color }}
            />
            <span className="text-xs text-white/60 truncate">{item.category}</span>
          </div>
          <span className="text-xs text-white/80 font-medium shrink-0">
            {formatILS(item.amount)}
          </span>
        </div>
      ))}
    </div>
  );
}

interface Props {
  data: CategoryData[];
  title?: string;
}

export default function CategoryChart({ data, title = 'הוצאות לפי קטגוריה' }: Props) {
  const total = data.reduce((s, d) => s + d.amount, 0);

  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-white font-semibold mb-1">{title}</h2>
      <p className="text-white/40 text-xs mb-4">כלל התקופה</p>

      <div className="relative">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="amount"
              nameKey="category"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry) => (
                <Cell key={entry.category} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Centre label */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          style={{ top: '0px' }}
        >
          <p className="text-white font-bold text-base">{formatILS(total)}</p>
          <p className="text-white/40 text-xs">סה״כ</p>
        </div>
      </div>

      <CustomLegend data={data} />
    </div>
  );
}
