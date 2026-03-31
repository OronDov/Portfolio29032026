'use client';

interface StatCardProps {
  title: string;
  value: string;
  sub?: string;
  icon: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  accentColor?: string;
}

export default function StatCard({
  title,
  value,
  sub,
  icon,
  trend,
  trendValue,
  accentColor = 'rgba(139,92,246,0.15)',
}: StatCardProps) {
  const trendColor =
    trend === 'up' ? '#34d399' : trend === 'down' ? '#f87171' : '#94a3b8';

  return (
    <div
      className="glass-card rounded-2xl p-6 flex flex-col gap-3"
      style={{ borderColor: 'rgba(255,255,255,0.08)' }}
    >
      <div className="flex items-start justify-between">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
          style={{ background: accentColor }}
        >
          {icon}
        </div>
        {trendValue && (
          <span
            className="text-xs font-medium px-2 py-1 rounded-full"
            style={{
              color: trendColor,
              background: `${trendColor}18`,
            }}
          >
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
          </span>
        )}
      </div>

      <div>
        <p className="text-xs uppercase tracking-widest text-white/40 font-medium mb-1">
          {title}
        </p>
        <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
        {sub && <p className="text-xs text-white/40 mt-1">{sub}</p>}
      </div>
    </div>
  );
}
