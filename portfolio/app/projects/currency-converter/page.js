'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'ILS', name: 'Israeli Shekel', flag: '🇮🇱' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
  { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' },
  { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳' },
  { code: 'MXN', name: 'Mexican Peso', flag: '🇲🇽' },
  { code: 'BRL', name: 'Brazilian Real', flag: '🇧🇷' },
  { code: 'THB', name: 'Thai Baht', flag: '🇹🇭' },
  { code: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬' },
  { code: 'NZD', name: 'New Zealand Dollar', flag: '🇳🇿' },
  { code: 'TRY', name: 'Turkish Lira', flag: '🇹🇷' },
  { code: 'ZAR', name: 'South African Rand', flag: '🇿🇦' },
  { code: 'NOK', name: 'Norwegian Krone', flag: '🇳🇴' },
  { code: 'SEK', name: 'Swedish Krona', flag: '🇸🇪' },
  { code: 'DKK', name: 'Danish Krone', flag: '🇩🇰' },
]

const DEFAULT_FAVORITES = ['USD', 'EUR', 'ILS', 'GBP', 'JPY', 'THB']

function CurrencySelect({ value, onChange, currencies }) {
  const [open, setOpen] = useState(false)
  const selected = currencies.find(c => c.code === value) || currencies[0]

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '14px 20px',
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '16px',
          color: 'white',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: '600',
          width: '100%',
          transition: 'all 0.2s',
          fontFamily: 'system-ui',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
      >
        <span style={{ fontSize: '24px' }}>{selected.flag}</span>
        <span>{selected.code}</span>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', flex: 1, textAlign: 'left' }}>{selected.name}</span>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0,
          background: '#1a1a2e',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          overflow: 'hidden',
          zIndex: 50,
          maxHeight: '260px',
          overflowY: 'auto',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        }}>
          {currencies.map(c => (
            <button
              key={c.code}
              onClick={() => { onChange(c.code); setOpen(false) }}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                width: '100%', padding: '12px 20px',
                background: c.code === value ? 'rgba(139,92,246,0.2)' : 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                textAlign: 'left',
                transition: 'background 0.15s',
                fontFamily: 'system-ui',
              }}
              onMouseEnter={e => { if (c.code !== value) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
              onMouseLeave={e => { if (c.code !== value) e.currentTarget.style.background = 'transparent' }}
            >
              <span style={{ fontSize: '20px' }}>{c.flag}</span>
              <span style={{ fontWeight: '600', minWidth: '44px' }}>{c.code}</span>
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px' }}>{c.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('100')
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('ILS')
  const [rates, setRates] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [favorites, setFavorites] = useState(DEFAULT_FAVORITES)
  const [swapping, setSwapping] = useState(false)
  const [resultKey, setResultKey] = useState(0)

  const fetchRates = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch(`https://api.frankfurter.app/latest?from=${from}`)
      if (!res.ok) throw new Error('Failed to fetch rates')
      const data = await res.json()
      setRates({ ...data.rates, [from]: 1 })
      setLastUpdated(new Date())
    } catch (e) {
      setError('Could not load live rates. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [from])

  useEffect(() => { fetchRates() }, [fetchRates])

  const converted = rates[to] ? (parseFloat(amount || 0) * rates[to]).toFixed(2) : '—'
  const rate = rates[to] ? rates[to].toFixed(4) : '—'

  const handleSwap = () => {
    setSwapping(true)
    setTimeout(() => {
      setFrom(to)
      setTo(from)
      setSwapping(false)
    }, 300)
  }

  const handleAmountChange = (val) => {
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setAmount(val)
      setResultKey(k => k + 1)
    }
  }

  const toggleFavorite = (code) => {
    setFavorites(prev =>
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    )
  }

  const favCurrencies = CURRENCIES.filter(c => favorites.includes(c.code) && c.code !== from && c.code !== to)

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29 0%, #1a0533 30%, #24243e 60%, #0f2027 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: 'white',
      padding: '0 0 80px',
    }}>
      {/* Animated BG elements */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${['rgba(249,115,22,0.08)', 'rgba(236,72,153,0.06)', 'rgba(139,92,246,0.08)', 'rgba(59,130,246,0.05)', 'rgba(249,115,22,0.06)', 'rgba(52,211,153,0.05)'][i]} 0%, transparent 70%)`,
            width: `${300 + i * 80}px`,
            height: `${300 + i * 80}px`,
            left: `${[10, 60, 80, 5, 40, 70][i]}%`,
            top: `${[20, 10, 50, 70, 80, 30][i]}%`,
            transform: 'translate(-50%, -50%)',
            animation: `float ${6 + i * 1.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.8}s`,
            filter: 'blur(30px)',
          }} />
        ))}
      </div>

      {/* Navbar */}
      <nav style={{
        position: 'relative', zIndex: 10,
        padding: '20px 32px',
        display: 'flex', alignItems: 'center', gap: '16px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(0,0,0,0.2)',
        backdropFilter: 'blur(20px)',
      }}>
        <Link href="/" style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          textDecoration: 'none', color: 'rgba(255,255,255,0.5)',
          fontSize: '14px', transition: 'color 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.color = 'white'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
        >
          ← Back to Portfolio
        </Link>
        <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
        <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>✈️ Travel Currency Converter</span>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '720px', margin: '0 auto', padding: '60px 24px 0' }}>

        {/* Header */}
        <div className="animate-slide-up" style={{ textAlign: 'center', marginBottom: '56px', opacity: 0 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding: '8px 20px',
            background: 'rgba(249,115,22,0.1)',
            border: '1px solid rgba(249,115,22,0.2)',
            borderRadius: '50px',
            marginBottom: '24px',
            fontSize: '13px', color: 'rgba(249,115,22,0.9)',
          }}>
            <span>🌍</span> Live exchange rates
            {!loading && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399', display: 'inline-block', marginLeft: '4px' }} />}
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: '800', lineHeight: 1.1, marginBottom: '14px' }}>
            Currency{' '}
            <span style={{
              background: 'linear-gradient(135deg, #f97316, #ec4899, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Converter</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '17px' }}>
            Know your money wherever you travel
          </p>
        </div>

        {/* Main converter card */}
        <div className="animate-slide-up delay-100" style={{
          opacity: 0,
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(40px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '32px',
          padding: '40px',
          marginBottom: '24px',
          boxShadow: '0 40px 80px rgba(0,0,0,0.4)',
        }}>
          {error && (
            <div style={{
              padding: '12px 16px', background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.2)', borderRadius: '12px',
              color: '#fca5a5', fontSize: '14px', marginBottom: '24px',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              ⚠️ {error}
              <button onClick={fetchRates} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#f97316', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>Retry</button>
            </div>
          )}

          {/* FROM */}
          <div style={{ marginBottom: '8px' }}>
            <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '3px', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>From</label>
            <CurrencySelect value={from} onChange={setFrom} currencies={CURRENCIES} />
            <div style={{ marginTop: '12px', position: 'relative' }}>
              <input
                type="text"
                value={amount}
                onChange={e => handleAmountChange(e.target.value)}
                placeholder="0"
                style={{
                  width: '100%', padding: '18px 20px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  color: 'white', fontSize: '28px', fontWeight: '700',
                  outline: 'none', fontFamily: 'system-ui',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(249,115,22,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
              <span style={{
                position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)',
                color: 'rgba(255,255,255,0.3)', fontSize: '16px', fontWeight: '600',
              }}>{from}</span>
            </div>
          </div>

          {/* SWAP button */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            <button
              onClick={handleSwap}
              style={{
                width: '48px', height: '48px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f97316, #ec4899)',
                border: 'none',
                color: 'white', fontSize: '20px',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 20px rgba(249,115,22,0.4)',
                transition: 'all 0.3s',
                transform: swapping ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1) rotate(180deg)'; e.currentTarget.style.boxShadow = '0 0 35px rgba(249,115,22,0.6)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = swapping ? 'rotate(180deg)' : 'rotate(0deg)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(249,115,22,0.4)' }}
            >
              ⇅
            </button>
          </div>

          {/* TO */}
          <div>
            <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '3px', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>To</label>
            <CurrencySelect value={to} onChange={setTo} currencies={CURRENCIES} />
            <div style={{ marginTop: '12px', position: 'relative' }}>
              <div style={{
                width: '100%', padding: '18px 20px',
                background: 'rgba(249,115,22,0.06)',
                border: '1px solid rgba(249,115,22,0.2)',
                borderRadius: '16px',
                fontSize: '28px', fontWeight: '700',
                color: loading ? 'rgba(255,255,255,0.2)' : '#fdba74',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span key={resultKey} className="animate-number-roll">
                  {loading ? '...' : converted}
                </span>
                <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.3)', fontWeight: '600' }}>{to}</span>
              </div>
            </div>
          </div>

          {/* Rate info */}
          {!loading && !error && (
            <div style={{
              marginTop: '20px',
              padding: '14px 18px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '12px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              fontSize: '13px', color: 'rgba(255,255,255,0.4)',
            }}>
              <span>1 {from} = {rate} {to}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399', display: 'inline-block' }} />
                Live · {lastUpdated?.toLocaleTimeString()}
              </span>
            </div>
          )}
        </div>

        {/* Quick convert — favorites row */}
        <div className="animate-slide-up delay-200" style={{ opacity: 0 }}>
          <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>Quick convert</span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>pin your travel currencies ★</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '10px' }}>
            {CURRENCIES.filter(c => c.code !== from).map(c => {
              const val = rates[c.code] ? (parseFloat(amount || 1) * rates[c.code]).toFixed(2) : '—'
              const isFav = favorites.includes(c.code)
              const isTo = c.code === to

              if (!isFav && !isTo) return null

              return (
                <div
                  key={c.code}
                  onClick={() => setTo(c.code)}
                  style={{
                    padding: '14px 16px',
                    background: isTo ? 'rgba(249,115,22,0.12)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${isTo ? 'rgba(249,115,22,0.3)' : 'rgba(255,255,255,0.07)'}`,
                    borderRadius: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative',
                  }}
                  onMouseEnter={e => { if (!isTo) e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
                  onMouseLeave={e => { if (!isTo) e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                >
                  <button
                    onClick={e => { e.stopPropagation(); toggleFavorite(c.code) }}
                    style={{
                      position: 'absolute', top: '8px', right: '10px',
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: '12px', opacity: 0.5, transition: 'opacity 0.2s',
                      color: isFav ? '#f59e0b' : 'white',
                    }}
                    title={isFav ? 'Unpin' : 'Pin'}
                  >
                    {isFav ? '★' : '☆'}
                  </button>
                  <div style={{ fontSize: '20px', marginBottom: '4px' }}>{c.flag}</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '2px' }}>{c.code}</div>
                  <div style={{ fontSize: '17px', fontWeight: '700', color: isTo ? '#fdba74' : 'white' }}>
                    {loading ? '...' : val}
                  </div>
                </div>
              )
            })}

            {/* Add more button */}
            {CURRENCIES.filter(c => !favorites.includes(c.code) && c.code !== from).slice(0, 2).map(c => (
              <div
                key={c.code}
                onClick={() => toggleFavorite(c.code)}
                style={{
                  padding: '14px 16px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px dashed rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(249,115,22,0.3)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
              >
                <div style={{ fontSize: '20px', marginBottom: '4px' }}>{c.flag}</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>{c.code}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', marginTop: '2px' }}>+ Add</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="animate-slide-up delay-300" style={{ opacity: 0, textAlign: 'center', marginTop: '48px' }}>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>
            Rates from <a href="https://www.frankfurter.app" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(249,115,22,0.5)', textDecoration: 'none' }}>Frankfurter API</a> · Updated daily · Not for financial use
          </p>
        </div>
      </div>
    </div>
  )
}
