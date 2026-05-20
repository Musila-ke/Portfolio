export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'var(--color-bg-alt)',
        borderTop: '1px solid var(--color-border)',
        padding: 'var(--space-xl) 0',
        textAlign: 'center',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-sm)',
          }}
        >
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
            &copy; {year} Kelvin Maingi Musila. All rights reserved.
          </p>
          <p
            style={{
              color: 'var(--color-text-dim)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.05em',
            }}
          >
            Designed & built with care
          </p>
        </div>
      </div>
    </footer>
  );
}
