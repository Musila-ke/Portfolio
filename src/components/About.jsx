import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, Server, Users } from 'lucide-react';

const stats = [
  { number: '10+', label: 'Projects Built', icon: Code },
  { number: 'Full Stack', label: 'Capability', icon: Server },
  { number: 'Open', label: 'to Collaborate', icon: Users },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" ref={ref} style={{ background: 'var(--color-bg-alt)', position: 'relative' }}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">The person behind the code</p>
        </motion.div>

        <motion.div
          style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3
            style={{
              fontSize: 'var(--text-3xl)',
              marginBottom: 'var(--space-md)',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            I'm Kelvin — software engineer & problem solver
          </h3>
          <p
            style={{
              color: 'var(--color-text-muted)',
              marginBottom: 'var(--space-md)',
              lineHeight: 1.8,
              fontSize: 'var(--text-base)',
              maxWidth: 680,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            I build web applications and Android mobile apps with a focus on clean architecture and
            great user experiences. My passion lies in backend engineering and DevOps —
            designing robust server-side systems, managing infrastructure, and automating workflows
            that keep applications running smoothly.
          </p>
          <p
            style={{
              color: 'var(--color-text-muted)',
              marginBottom: 'var(--space-md)',
              lineHeight: 1.8,
              fontSize: 'var(--text-base)',
              maxWidth: 680,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            I work with Kotlin for Android, React and Next.js for the web, and I'm constantly deepening
            my skills in cloud services, CI/CD, containerization, and database design. Every project is
            an opportunity to learn something new and ship something that works.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'var(--space-md)',
            marginTop: 'var(--space-xl)',
            maxWidth: 800,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
            hidden: {},
          }}
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  textAlign: 'center',
                  padding: 'var(--space-lg) var(--space-md)',
                  background: 'var(--color-bg-card)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default',
                  transition: 'transform 0.3s ease, border-color 0.3s ease, background 0.3s ease',
                }}
                whileHover={{ y: -4, borderColor: 'var(--color-accent-dim)' }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: 'linear-gradient(90deg, transparent, var(--color-accent-dim), transparent)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  }}
                  className="stat-glow"
                />
                <Icon
                  size={24}
                  style={{
                    color: 'var(--color-accent)',
                    marginBottom: 'var(--space-sm)',
                  }}
                />
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 600,
                    color: 'var(--color-accent)',
                    marginBottom: 'var(--space-xs)',
                    lineHeight: 1,
                  }}
                >
                  {stat.number}
                </span>
                <span
                  style={{
                    display: 'block',
                    color: 'var(--color-text-muted)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 400,
                  }}
                >
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <style>{`
        .stat-item:hover .stat-glow { opacity: 1; }
      `}</style>
    </section>
  );
}
