'use client';

import { useMemo, useState } from 'react';
import {
  SAMPLE_TRANSACTIONS,
  MONTHLY_STATS,
  getCategoryTotals,
  formatILS,
} from '@/lib/finance/sampleData';
import StatCard      from './StatCard';
import MonthlyChart  from './MonthlyChart';
import CategoryChart from './CategoryChart';
import SavingsChart  from './SavingsChart';
import TransactionTable from './TransactionTable';

interface Props {
  logoutAction: () => Promise<void>;
}

export default function FinanceDashboard({ logoutAction }: Props) {
  const [selectedMonth, setSelectedMonth] = useState<string>('');

  // ── Derived stats ─────────────────────────────────────────────────────────
  const filteredTx = useMemo(
    () =>
      selectedMonth
        ? SAMPLE_TRANSACTIONS.filter((t) => t.month === selectedMonth)
        : SAMPLE_TRANSACTIONS,
    [selectedMonth]
  );

  const filteredStats = useMemo(
    () =>
      selectedMonth
        ? MONTHLY_STATS.filter((s) => s.month === selectedMonth)
        : MONTHLY_STATS,
    [selectedMonth]
  );

  const totalIncome   = filteredStats.reduce((s, m) => s + m.income,   0);
  const totalExpenses = filteredStats.reduce((s, m) => s + m.expenses, 0);
  const totalSavings  = totalIncome - totalExpenses;
  const savingsRate   = totalIncome > 0 ? (totalSavings / totalIncome) * 100 : 0;

  const categoryData  = getCategoryTotals(filteredTx);
  const topCategory   = categoryData[0];

  const avgMonthlyExpenses =
    filteredStats.length > 0 ? totalExpenses / filteredStats.length : 0;

  return (
    <div
      className="min-h-screen"
      style={{ background: '#0a0a1a', fontFamily: 'system-ui, sans-serif' }}
      dir="rtl"
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-30 px-6 py-4 flex items-center justify-between"
        style={{
          background: 'rgba(10,10,26,0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
            style={{ background: 'rgba(139,92,246,0.2)' }}
          >
            💰
          </div>
          <div>
            <h1 className="gradient-text text-base font-bold leading-tight">
              ניהול כספים
            </h1>
            <p className="text-white/30 text-xs">Oron &amp; Limir · נתוני דוגמה</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Month picker */}
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="rounded-xl px-3 py-1.5 text-sm text-white outline-none cursor-pointer"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <option value="">כל התקופה</option>
            {MONTHLY_STATS.map((s) => (
              <option key={s.month} value={s.month}>{s.label}</option>
            ))}
          </select>

          {/* Logout */}
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-xl px-3 py-1.5 text-xs text-white/50 transition-all hover:text-white/80"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              יציאה
            </button>
          </form>
        </div>
      </header>

      {/* ── Main content ────────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-6">

        {/* ── Stat cards ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="הכנסות"
            value={formatILS(totalIncome)}
            sub={`${filteredStats.length} חודשים`}
            icon="📈"
            accentColor="rgba(52,211,153,0.15)"
            trend="up"
            trendValue={`ממוצע ${formatILS(totalIncome / (filteredStats.length || 1))}`}
          />
          <StatCard
            title="הוצאות"
            value={formatILS(totalExpenses)}
            sub={`ממוצע ${formatILS(avgMonthlyExpenses)}/חודש`}
            icon="📉"
            accentColor="rgba(139,92,246,0.15)"
          />
          <StatCard
            title="חיסכון נטו"
            value={formatILS(totalSavings)}
            sub="הכנסות פחות הוצאות"
            icon="🏦"
            accentColor={totalSavings >= 0 ? 'rgba(52,211,153,0.15)' : 'rgba(248,113,113,0.15)'}
            trend={totalSavings >= 0 ? 'up' : 'down'}
          />
          <StatCard
            title="שיעור חיסכון"
            value={`${savingsRate.toFixed(1)}%`}
            sub={topCategory ? `גדול ביותר: ${topCategory.category}` : ''}
            icon="🎯"
            accentColor="rgba(96,165,250,0.15)"
            trend={savingsRate >= 20 ? 'up' : savingsRate >= 0 ? 'neutral' : 'down'}
          />
        </div>

        {/* ── Charts row ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <MonthlyChart data={MONTHLY_STATS} />
          </div>
          <div>
            <CategoryChart data={categoryData} />
          </div>
        </div>

        {/* ── Savings chart ───────────────────────────────────────────────── */}
        <SavingsChart data={MONTHLY_STATS} />

        {/* ── Transactions ────────────────────────────────────────────────── */}
        <TransactionTable transactions={filteredTx} />
      </main>
    </div>
  );
}
