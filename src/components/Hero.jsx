import { useEffect, useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, MoveRight } from 'lucide-react';

const roles = [
  'Software Engineer',
  'Android Developer',
  'Backend Engineer',
  'Upcoming DevOps Practitioner',
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  // Rotating role titles (from 21st.dev animated hero pattern)
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev === roles.length - 1 ? 0 : prev + 1));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Mouse parallax
  const handleMouse = useCallback((e) => {
    setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [handleMouse]);

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 80,
      }}
    >
      {/* Animated background with mouse tracking */}
      <div
        style={{
          position: 'absolute',
          inset: '-50%',
          zIndex: 0,
          background: `
            radial-gradient(ellipse 60% 50% at ${20 + mousePos.x * 20}% ${50 + mousePos.y * 10}%, rgba(212, 168, 83, 0.08) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at ${80 - mousePos.x * 20}% ${20 + mousePos.y * 15}%, rgba(212, 168, 83, 0.05) 0%, transparent 50%),
            radial-gradient(ellipse 40% 40% at ${60 + mousePos.x * 10}% ${80 - mousePos.y * 10}%, rgba(212, 168, 83, 0.04) 0%, transparent 50%),
            radial-gradient(ellipse 70% 30% at ${40 - mousePos.x * 15}% ${30 + mousePos.y * 20}%, rgba(139, 92, 246, 0.03) 0%, transparent 50%)
          `,
          transition: 'background 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />

      {/* Floating geometric shapes */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: 400,
            height: 400,
            top: -100,
            right: -100,
            border: '1px solid var(--color-border)',
            borderRadius: '50%',
          }}
        />
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: 200,
            height: 200,
            bottom: '20%',
            left: -60,
            border: '1px solid var(--color-border)',
            borderRadius: '50%',
          }}
        />
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [45, 55, 45] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: 60,
            height: 60,
            top: '30%',
            right: '15%',
            border: '1px solid var(--color-accent-dim)',
          }}
        />
      </div>

      {/* Hero content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: 900,
          padding: '0 2rem',
        }}
      >
        {/* CTA badge - from 21st.dev pattern */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 'var(--space-xl)' }}
        >
          <a
            href="#projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1.25rem',
              borderRadius: 50,
              fontSize: 'var(--text-sm)',
              fontWeight: 500,
              color: 'var(--color-accent)',
              border: '1px solid var(--color-accent-dim)',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              background: 'rgba(212, 168, 83, 0.06)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(212, 168, 83, 0.12)';
              e.currentTarget.style.borderColor = 'var(--color-accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(212, 168, 83, 0.06)';
              e.currentTarget.style.borderColor = 'var(--color-accent-dim)';
            }}
          >
            Explore my work <MoveRight size={14} />
          </a>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 'clamp(2.5rem, 10vw, 5.5rem)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            marginBottom: 'var(--space-sm)',
          }}
        >
          <span style={{ display: 'block' }}>Hi, I'm Kelvin</span>
          <span style={{ display: 'block', color: 'var(--color-accent)', fontStyle: 'italic' }}>
            Maingi Musila
          </span>
        </motion.h1>

        {/* Rotating role titles — from 21st.dev animated hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            height: 'clamp(2rem, 4vw, 3rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 'var(--space-md)',
            position: 'relative',
          }}
        >
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
            <span style={{ opacity: 0.6 }}>I'm a </span>
            <span style={{ position: 'relative', display: 'inline-block', width: 180, textAlign: 'left', height: '1.4em', verticalAlign: 'bottom' }}>
              {roles.map((role, i) => (
                <motion.span
                  key={role}
                  style={{
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    color: 'var(--color-accent)',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}
                  initial={{ opacity: 0, y: '100%' }}
                  animate={
                    roleIndex === i
                      ? { y: 0, opacity: 1 }
                      : { y: roleIndex > i ? '-100%' : '100%', opacity: 0 }
                  }
                  transition={{ type: 'spring', stiffness: 80, damping: 12 }}
                >
                  {role}
                </motion.span>
              ))}
            </span>
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            color: 'var(--color-text-muted)',
            fontWeight: 400,
            fontFamily: 'var(--font-body)',
            marginBottom: 'var(--space-lg)',
            maxWidth: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 1.6,
          }}
        >
          Building web apps, Android mobile applications, and robust backend systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'flex',
            gap: 'var(--space-md)',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: 'var(--space-xl)',
          }}
        >
          <a href="#projects" className="btn btn-primary">
            View My Work
          </a>
          <a href="#contact" className="btn btn-secondary">
            Get In Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-xs)',
          textDecoration: 'none',
          color: 'var(--color-text-muted)',
          fontSize: 'var(--text-xs)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          cursor: 'pointer',
        }}
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span style={{ writingMode: 'vertical-rl', fontSize: '0.625rem', letterSpacing: '0.2em', opacity: 0.5 }}>
          Scroll
        </span>
        <ArrowDown size={14} style={{ opacity: 0.4 }} />
      </motion.a>
    </section>
  );
}
