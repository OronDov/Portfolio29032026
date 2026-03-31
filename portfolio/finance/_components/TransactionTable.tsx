'use client';

import { useState, useMemo } from 'react';
import { Transaction, CATEGORIES, CATEGORY_COLORS, formatILS } from '@/lib/finance/sampleData';

interface Props {
  transactions: Transaction[];
}

export default function TransactionTable({ transactions }: Props) {
  const [search, setSearch]     = useState('');
  const [category, setCategory] = useState('');
  const [cardholder, setCardholder] = useState('');
  const [page, setPage]         = useState(0);
  const PAGE_SIZE = 12;

  const filtered = useMemo(() => {
    return transactions
      .filter((t) => {
        const matchSearch =
          !search ||
          t.merchant.toLowerCase().includes(search.toLowerCase()) ||
          t.category.toLowerCase().includes(search.toLowerCase());
        const matchCat  = !category || t.category === category;
        const matchCard = !cardholder || t.cardholder === cardholder;
        return matchSearch && matchCat && matchCard;
      })
      .sort((a, b) => {
        const [da, ma, ya] = a.txDate.split('/').map(Number);
        const [db, mb, yb] = b.txDate.split('/').map(Number);
        return new Date(yb, mb - 1, db).getTime() - new Date(ya, ma - 1, da).getTime();
      });
  }, [transactions, search, category, cardholder]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  function handleFilter() {
    setPage(0);
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-white font-semibold">עסקאות</h2>
          <p className="text-white/40 text-xs">{filtered.length} עסקאות</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Search */}
          <input
            type="text"
            placeholder="חיפוש..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); handleFilter(); }}
            className="rounded-xl px-3 py-1.5 text-sm text-white placeholder-white/30 outline-none"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              minWidth: '140px',
            }}
            dir="rtl"
          />
          {/* Category filter */}
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); handleFilter(); }}
            className="rounded-xl px-3 py-1.5 text-sm text-white outline-none cursor-pointer"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
            dir="rtl"
          >
            <option value="">כל הקטגוריות</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {/* Cardholder filter */}
          <select
            value={cardholder}
            onChange={(e) => { setCardholder(e.target.value); handleFilter(); }}
            className="rounded-xl px-3 py-1.5 text-sm text-white outline-none cursor-pointer"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <option value="">כל בעלי הכרטיס</option>
            <option value="אורון">אורון</option>
            <option value="לימור">לימור</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm" dir="rtl">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              {['תאריך', 'בית עסק', 'קטגוריה', 'בעל כרטיס', 'סכום'].map((h) => (
                <th
                  key={h}
                  className="pb-3 text-right text-xs font-medium uppercase tracking-wider text-white/30"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((t) => {
              const color = CATEGORY_COLORS[t.category] ?? '#6b7280';
              return (
                <tr
                  key={t.id}
                  className="transition-colors"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.background =
                      'rgba(255,255,255,0.03)')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = 'transparent')
                  }
                >
                  <td className="py-3 pr-0 text-white/50 text-xs whitespace-nowrap">
                    {t.txDate}
                  </td>
                  <td className="py-3 px-2 text-white/80 max-w-[160px] truncate">
                    {t.merchant}
                  </td>
                  <td className="py-3 px-2">
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{ background: `${color}18`, color }}
                    >
                      {t.category}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-white/50 text-xs">{t.cardholder}</td>
                  <td className="py-3 pl-0 text-right font-semibold text-white tabular-nums">
                    {formatILS(t.chargedAmount)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-5">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-3 py-1.5 rounded-lg text-xs text-white/60 disabled:opacity-30 transition-colors"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            ←
          </button>
          <span className="text-xs text-white/40">
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="px-3 py-1.5 rounded-lg text-xs text-white/60 disabled:opacity-30 transition-colors"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
