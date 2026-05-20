import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    fetch('data/projects.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load');
        return res.json();
      })
      .then(setProjects)
      .catch(() => setError(true));
  }, []);

  return (
    <section id="projects" ref={ref} style={{ background: 'var(--color-bg-alt)' }}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">Recent work I'm proud of</p>
        </motion.div>

        {error ? (
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>
            Unable to load projects at this time.
          </p>
        ) : (
          <motion.div
            className="projects-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: 'var(--space-lg)',
            }}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {projects.map((project) => (
              <motion.article
                key={project.title}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                style={{
                  background: 'var(--color-bg-card)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-accent-dim)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                }}
              >
                {/* Gradient border glow on hover */}
                <div
                  style={{
                    position: 'absolute',
                    inset: -1,
                    borderRadius: 'var(--radius-lg)',
                    background: 'linear-gradient(135deg, transparent 40%, var(--color-accent-glow), transparent 60%)',
                    opacity: 0,
                    transition: 'opacity 0.4s ease',
                    zIndex: 0,
                    pointerEvents: 'none',
                  }}
                  className="card-glow"
                />
                <div
                  className="project-content"
                  style={{
                    padding: 'var(--space-xl) var(--space-lg)',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <h3
                    style={{
                      fontSize: 'var(--text-2xl)',
                      marginBottom: 'var(--space-sm)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    style={{
                      color: 'var(--color-text-muted)',
                      marginBottom: 'var(--space-md)',
                      flex: 1,
                      fontSize: 'var(--text-sm)',
                      lineHeight: 1.7,
                    }}
                  >
                    {project.description}
                  </p>

                  {project.tags && (
                    <div
                      className="project-tags"
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                        marginBottom: 'var(--space-md)',
                      }}
                    >
                      {project.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div
                    className="project-links"
                    style={{ display: 'flex', gap: 'var(--space-sm)' }}
                  >
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          flex: 1,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          padding: '0.625rem 1rem',
                          borderRadius: 'var(--radius-md)',
                          textDecoration: 'none',
                          fontWeight: 500,
                          fontSize: 'var(--text-sm)',
                          background: 'var(--color-accent)',
                          color: 'var(--color-bg)',
                          transition: 'background 0.2s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-accent-light)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--color-accent)')}
                      >
                        <Github size={16} />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>

      <style>{`
        .project-card:hover .card-glow { opacity: 1; }
      `}</style>
    </section>
  );
}
