'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { financeLoginAction } from './actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-50"
      style={{
        background: pending
          ? 'rgba(139,92,246,0.4)'
          : 'linear-gradient(135deg, #8b5cf6, #6366f1)',
        boxShadow: pending ? 'none' : '0 0 24px rgba(139,92,246,0.4)',
      }}
    >
      {pending ? '...' : 'כניסה'}
    </button>
  );
}

export default function FinanceLoginPage() {
  const [state, action] = useFormState(financeLoginAction, {});

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: '#0a0a1a' }}
    >
      {/* Background glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl animate-pulse-glow"
            style={{ background: 'rgba(139,92,246,0.15)' }}
          >
            💰
          </div>
        </div>

        {/* Card */}
        <div className="glass-card rounded-2xl p-8" dir="rtl">
          <h1 className="gradient-text text-2xl font-bold text-center mb-1">
            ניהול כספים
          </h1>
          <p className="text-white/40 text-sm text-center mb-7">
            הזן סיסמה להמשך
          </p>

          <form action={action} className="space-y-4">
            <input
              name="password"
              type="password"
              placeholder="סיסמה"
              autoFocus
              required
              className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none transition-all"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = 'rgba(139,92,246,0.5)')
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')
              }
            />

            {state?.error && (
              <p className="text-xs text-red-400 text-center animate-fade-in">
                {state.error}
              </p>
            )}

            <SubmitButton />
          </form>
        </div>
      </div>
    </div>
  );
}
