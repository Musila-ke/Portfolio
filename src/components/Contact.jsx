import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';

const contactItems = [
  {
    icon: Mail,
    label: 'Email',
    value: 'kelvinmusilamaingi@gmail.com',
    href: 'mailto:kelvinmusilamaingi@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+254 733 780 652',
    href: 'tel:+254733780652',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Kenya',
  },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/Musila-ke', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/kelvin-musila-9019b530b/', label: 'LinkedIn' },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" ref={ref} style={{ background: 'var(--color-bg)' }}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Let's work together</p>
        </motion.div>

        <motion.div
          style={{
            maxWidth: 600,
            margin: '0 auto',
            textAlign: 'center',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3
            style={{
              fontSize: 'var(--text-3xl)',
              marginBottom: 'var(--space-md)',
              letterSpacing: '-0.02em',
            }}
          >
            Have a project in mind?
          </h3>
          <p
            style={{
              color: 'var(--color-text-muted)',
              marginBottom: 'var(--space-xl)',
              lineHeight: 1.8,
            }}
          >
            Whether it's a new project, a collaboration, or just a chat about tech —
            I'd love to hear from you. Always open to discussing new opportunities.
          </p>
        </motion.div>

        <motion.div
          style={{ maxWidth: 500, margin: '0 auto' }}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
            hidden: {},
          }}
        >
          {contactItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-md)',
                  justifyContent: 'center',
                  marginBottom: 'var(--space-lg)',
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--color-bg-card)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-accent)',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <h4
                    style={{
                      fontSize: 'var(--text-sm)',
                      marginBottom: '0.125rem',
                      color: 'var(--color-text-muted)',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {item.label}
                  </h4>
                  {item.href ? (
                    <a
                      href={item.href}
                      style={{
                        color: 'var(--color-text)',
                        textDecoration: 'none',
                        fontSize: 'var(--text-base)',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p style={{ color: 'var(--color-text)', fontSize: 'var(--text-base)' }}>
                      {item.value}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Social Links */}
        <motion.div
          style={{
            display: 'flex',
            gap: 'var(--space-sm)',
            justifyContent: 'center',
            marginTop: 'var(--space-xl)',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ y: -2, backgroundColor: 'var(--color-accent)', borderColor: 'var(--color-accent)' }}
                style={{
                  width: 44,
                  height: 44,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--color-bg-card)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-muted)',
                  transition: 'background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease',
                }}
              >
                <Icon size={20} />
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
