import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Smartphone,
  Globe,
  Server,
  Wrench,
  Database,
  Cloud,
  Shield,
  Terminal,
} from 'lucide-react';

const skillsData = [
  {
    category: 'Android',
    icon: Smartphone,
    items: ['Kotlin', 'Firebase Suite', 'Room Database', 'MVVM Architecture', 'Material Design'],
  },
  {
    category: 'Web',
    icon: Globe,
    items: ['React & Next.js', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Ant Design', 'RESTful APIs'],
  },
  {
    category: 'Backend & DevOps',
    icon: Server,
    items: ['Node.js & Express', 'Python', 'Firebase Cloud Functions', 'Docker'],
  },
  {
    category: 'Tools',
    icon: Wrench,
    items: ['Git & GitHub', 'Android Studio', 'VS Code', 'Figma'],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" ref={ref} style={{ background: 'var(--color-bg)' }}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="section-title">Skills & Expertise</h2>
          <p className="section-subtitle">Technologies I work with</p>
        </motion.div>

        <motion.div
          className="skills-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'var(--space-lg)',
          }}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {skillsData.map((skill) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.category}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                style={{
                  background: 'var(--color-bg-card)',
                  padding: 'var(--space-xl)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default',
                  transition: 'border-color 0.3s ease, background 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border-light)';
                  e.currentTarget.style.background = 'var(--color-bg-surface)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.background = 'var(--color-bg-card)';
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 80,
                    height: 80,
                    background: 'radial-gradient(circle at top right, var(--color-accent-glow), transparent 70%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  }}
                  className="skill-glow"
                />
                <Icon
                  size={28}
                  style={{
                    color: 'var(--color-accent)',
                    marginBottom: 'var(--space-md)',
                    display: 'inline-block',
                  }}
                />
                <h3
                  style={{
                    fontSize: 'var(--text-xl)',
                    marginBottom: 'var(--space-md)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {skill.category}
                </h3>
                <ul style={{ listStyle: 'none' }}>
                  {skill.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        padding: '0.4rem 0',
                        color: 'var(--color-text-muted)',
                        fontSize: 'var(--text-sm)',
                        paddingLeft: '1.25rem',
                        position: 'relative',
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          left: 0,
                          color: 'var(--color-accent-dim)',
                        }}
                      >
                        —
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <style>{`
        .skill-category:hover .skill-glow { opacity: 1; }
      `}</style>
    </section>
  );
}
