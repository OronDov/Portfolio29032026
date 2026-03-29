'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const STARS = Array.from({ length: 120 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 2,
}))

const PROJECTS = [
  {
    id: 1,
    title: 'Travel Currency Converter',
    description: 'Real-time exchange rates for travelers. Convert between 30+ currencies instantly with live data.',
    emoji: '✈️',
    tags: ['Live API', 'React', 'Travel'],
    color: 'from-orange-500 to-pink-500',
    glow: 'rgba(249,115,22,0.3)',
    href: '/projects/currency-converter',
    status: 'Live',
  },
  {
    id: 2,
    title: 'Coming Soon',
    description: 'More projects on the way. Stay tuned for new tools and experiments.',
    emoji: '🚀',
    tags: ['In Progress'],
    color: 'from-violet-500 to-blue-500',
    glow: 'rgba(139,92,246,0.3)',
    href: '#',
    status: 'Soon',
  },
]

const SKILLS = [
  { label: 'Product Thinking', icon: '🧠' },
  { label: 'Data Analysis', icon: '📊' },
  { label: 'Automation', icon: '⚡' },
  { label: 'AI Tools', icon: '🤖' },
  { label: 'Travel', icon: '🌍' },
  { label: 'Finance', icon: '💹' },
]

function Star({ star }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${star.x}%`,
        top: `${star.y}%`,
        width: `${star.size}px`,
        height: `${star.size}px`,
        borderRadius: '50%',
        background: 'white',
        animation: `twinkle ${star.duration}s ${star.delay}s ease-in-out infinite`,
        opacity: 0.3,
      }}
    />
  )
}

function Navbar({ scrolled }) {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '16px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(10,10,26,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '14px', fontWeight: 'bold', color: 'white',
        }}>O</div>
        <span style={{ color: 'white', fontWeight: '600', fontSize: '16px', fontFamily: 'system-ui' }}>
          orondov.com
        </span>
      </div>
      <div style={{ display: 'flex', gap: '32px' }}>
        {['Projects', 'About', 'Contact'].map(item => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            style={{
              color: 'rgba(255,255,255,0.6)',
              textDecoration: 'none',
              fontSize: '14px',
              fontFamily: 'system-ui',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = 'white'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  )
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState({})
  const sectionRefs = useRef({})

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(prev => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.15 }
    )
    Object.values(sectionRefs.current).forEach(ref => ref && observer.observe(ref))
    return () => observer.disconnect()
  }, [])

  const setRef = (id) => (el) => {
    sectionRefs.current[id] = el
  }

  return (
    <div style={{ background: '#0a0a1a', minHeight: '100vh', color: 'white', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Navbar scrolled={scrolled} />

      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {/* Stars */}
        <div style={{ position: 'absolute', inset: 0 }}>
          {STARS.map(s => <Star key={s.id} star={s} />)}
        </div>

        {/* Blobs */}
        <div style={{
          position: 'absolute', top: '10%', right: '10%',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)',
          animation: 'morph 8s ease-in-out infinite',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '15%', left: '5%',
          width: '350px', height: '350px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
          animation: 'morph 10s ease-in-out infinite reverse',
          filter: 'blur(40px)',
        }} />

        {/* Orbit ring */}
        <div style={{
          position: 'absolute',
          width: '600px', height: '600px',
          border: '1px solid rgba(139,92,246,0.1)',
          borderRadius: '50%',
          animation: 'spin-slow 20s linear infinite',
        }}>
          <div style={{
            position: 'absolute', top: '-4px', left: '50%',
            width: '8px', height: '8px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
            transform: 'translateX(-50%)',
          }} />
        </div>

        {/* Content */}
        <div style={{ position: 'relative', textAlign: 'center', padding: '0 20px', maxWidth: '700px' }}>
          <div className="animate-slide-up" style={{ opacity: 0 }}>
            <p style={{ color: 'rgba(167,139,250,0.8)', fontSize: '14px', letterSpacing: '4px', marginBottom: '20px', textTransform: 'uppercase' }}>
              Welcome to my corner of the internet
            </p>
          </div>

          <div className="animate-slide-up delay-100" style={{ opacity: 0 }}>
            <h1 style={{ fontSize: 'clamp(48px, 8vw, 90px)', fontWeight: '800', lineHeight: 1.05, marginBottom: '24px' }}>
              Hi, I'm{' '}
              <span className="gradient-text">Oron</span>
            </h1>
          </div>

          <div className="animate-slide-up delay-200" style={{ opacity: 0 }}>
            <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '48px', maxWidth: '520px', margin: '0 auto 48px' }}>
              I build creative tools and experiments — things that solve real problems in elegant ways.
            </p>
          </div>

          <div className="animate-slide-up delay-300" style={{ opacity: 0, display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#projects" style={{
              padding: '14px 32px',
              background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
              borderRadius: '50px',
              color: 'white',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '15px',
              transition: 'all 0.3s',
              boxShadow: '0 0 30px rgba(124,58,237,0.4)',
            }}
              onMouseEnter={e => { e.target.style.transform = 'scale(1.05)'; e.target.style.boxShadow = '0 0 50px rgba(124,58,237,0.6)' }}
              onMouseLeave={e => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = '0 0 30px rgba(124,58,237,0.4)' }}
            >
              See Projects ↓
            </a>
            <a href="#contact" style={{
              padding: '14px 32px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50px',
              color: 'white',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '15px',
              transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.target.style.borderColor = 'rgba(167,139,250,0.6)'; e.target.style.background = 'rgba(167,139,250,0.08)' }}
              onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.2)'; e.target.style.background = 'transparent' }}
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0.4 }}>
          <span style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>scroll</span>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)', animation: 'float 2s ease-in-out infinite' }} />
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding: '120px 24px', maxWidth: '1000px', margin: '0 auto' }}>
        <div
          id="proj-header"
          ref={setRef('proj-header')}
          style={{
            textAlign: 'center', marginBottom: '72px',
            opacity: visible['proj-header'] ? 1 : 0,
            transform: visible['proj-header'] ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease',
          }}
        >
          <p style={{ color: 'rgba(167,139,250,0.7)', fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '12px' }}>what i've built</p>
          <h2 style={{ fontSize: '48px', fontWeight: '800' }}>
            <span className="gradient-text">Projects</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {PROJECTS.map((project, i) => (
            <div
              key={project.id}
              id={`proj-${i}`}
              ref={setRef(`proj-${i}`)}
              style={{
                opacity: visible[`proj-${i}`] ? 1 : 0,
                transform: visible[`proj-${i}`] ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.7s ease ${i * 0.15}s`,
              }}
            >
              <Link href={project.href} style={{ textDecoration: 'none' }}>
                <div
                  className="glass-card"
                  style={{
                    borderRadius: '24px',
                    padding: '32px',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Glow */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                    background: `linear-gradient(90deg, transparent, ${project.glow}, transparent)`,
                  }} />

                  {/* Status badge */}
                  <div style={{
                    position: 'absolute', top: '20px', right: '20px',
                    padding: '4px 12px',
                    background: project.status === 'Live' ? 'rgba(52,211,153,0.15)' : 'rgba(139,92,246,0.15)',
                    border: `1px solid ${project.status === 'Live' ? 'rgba(52,211,153,0.3)' : 'rgba(139,92,246,0.3)'}`,
                    borderRadius: '20px',
                    fontSize: '11px',
                    color: project.status === 'Live' ? '#34d399' : '#a78bfa',
                    fontWeight: '600',
                  }}>
                    {project.status === 'Live' ? '● Live' : '◌ Soon'}
                  </div>

                  {/* Emoji */}
                  <div style={{
                    fontSize: '48px', marginBottom: '20px',
                    display: 'inline-block',
                    animation: 'float 4s ease-in-out infinite',
                  }}>{project.emoji}</div>

                  <h3 style={{ fontSize: '22px', fontWeight: '700', color: 'white', marginBottom: '10px' }}>
                    {project.title}
                  </h3>

                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '20px' }}>
                    {project.description}
                  </p>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {project.tags.map(tag => (
                      <span key={tag} style={{
                        padding: '4px 12px',
                        background: 'rgba(255,255,255,0.06)',
                        borderRadius: '20px',
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.5)',
                      }}>{tag}</span>
                    ))}
                  </div>

                  {project.href !== '#' && (
                    <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(167,139,250,0.8)', fontSize: '14px', fontWeight: '600' }}>
                      Open project <span>→</span>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: '80px 24px', maxWidth: '900px', margin: '0 auto' }}>
        <div
          id="about-content"
          ref={setRef('about-content')}
          style={{
            opacity: visible['about-content'] ? 1 : 0,
            transform: visible['about-content'] ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease',
          }}
        >
          <div className="glass" style={{ borderRadius: '32px', padding: '56px', position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', top: '-80px', right: '-80px',
              width: '250px', height: '250px',
              background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
              borderRadius: '50%',
            }} />

            <p style={{ color: 'rgba(167,139,250,0.7)', fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px' }}>about me</p>
            <h2 style={{ fontSize: '40px', fontWeight: '800', marginBottom: '24px' }}>
              Building tools that <span className="gradient-text-warm">make life easier</span>
            </h2>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.85, marginBottom: '40px', maxWidth: '580px' }}>
              I'm Oron — I love solving everyday problems with elegant digital tools. Whether it's managing finances, planning trips, or automating the boring stuff, I build things that work beautifully and actually get used.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {SKILLS.map((skill, i) => (
                <div key={skill.label} style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '10px 18px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '50px',
                  fontSize: '14px', color: 'rgba(255,255,255,0.7)',
                  transition: 'all 0.2s',
                  cursor: 'default',
                  animationDelay: `${i * 0.1}s`,
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(139,92,246,0.12)'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.3)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
                >
                  <span>{skill.icon}</span> {skill.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: '80px 24px 140px', textAlign: 'center' }}>
        <div
          id="contact-content"
          ref={setRef('contact-content')}
          style={{
            opacity: visible['contact-content'] ? 1 : 0,
            transform: visible['contact-content'] ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease',
            maxWidth: '560px',
            margin: '0 auto',
          }}
        >
          <p style={{ color: 'rgba(167,139,250,0.7)', fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px' }}>let's connect</p>
          <h2 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '20px' }}>
            Got an <span className="gradient-text">idea?</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '18px', marginBottom: '40px', lineHeight: 1.7 }}>
            I'm always open to interesting projects and collaborations.
          </p>
          <a
            href="mailto:orondov@gmail.com"
            style={{
              display: 'inline-block',
              padding: '16px 40px',
              background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
              borderRadius: '50px',
              color: 'white',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '16px',
              boxShadow: '0 0 40px rgba(124,58,237,0.35)',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.target.style.transform = 'scale(1.05)'; e.target.style.boxShadow = '0 0 60px rgba(124,58,237,0.55)' }}
            onMouseLeave={e => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = '0 0 40px rgba(124,58,237,0.35)' }}
          >
            Say Hello ✉️
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '24px',
        textAlign: 'center',
        color: 'rgba(255,255,255,0.25)',
        fontSize: '13px',
        fontFamily: 'system-ui',
      }}>
        © {new Date().getFullYear()} Oron Dov · orondov.com
      </footer>
    </div>
  )
}
