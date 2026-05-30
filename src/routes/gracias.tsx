import { createFileRoute } from '@tanstack/react-router'

type GraciasSearch = {
  plan?: string
}

export const Route = createFileRoute('/gracias')({
  validateSearch: (search: Record<string, unknown>): GraciasSearch => ({
    plan: typeof search.plan === 'string' ? search.plan : undefined,
  }),
  component: GraciasPage,
})

function getNextBillingDate(): string {
  const now = new Date()
  const next = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())
  return next.toLocaleDateString('es-CO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function getTodayFormatted(): string {
  return new Date().toLocaleDateString('es-CO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const planLabels: Record<string, string> = {
  '50gb': '50 GB',
  '100gb': '100 GB',
  '150gb': '150 GB',
  '200gb': '200 GB',
}

function GraciasPage() {
  const { plan } = Route.useSearch()
  const planLabel = plan ? planLabels[plan.toLowerCase()] || plan : null

  return (
    <div className="gracias-container grid-bg">
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,147,10,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="gracias-card">
        <div className="corner-mark tl" />
        <div className="corner-mark br" />

        {/* Success icon */}
        <div style={{
          width: '72px', height: '72px',
          background: 'rgba(34,197,94,0.1)',
          border: '1px solid rgba(34,197,94,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 2rem',
          clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)',
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          color: 'var(--text-primary)',
          letterSpacing: '0.04em',
          lineHeight: 1,
          marginBottom: '0.75rem',
        }}>
          GRACIAS POR<br />
          <span style={{ color: 'var(--accent)' }}>SU PAGO</span>
        </h1>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>
          Su pago ha sido recibido exitosamente.
          {planLabel && <> Su plan de almacenamiento en la nube de <strong style={{ color: 'var(--text-primary)' }}>{planLabel}</strong> ha sido activado.</>}
        </p>

        <div className="accent-bar" style={{ marginBottom: '1.5rem' }} />

        {/* Payment details */}
        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', padding: '1.5rem', marginBottom: '1.5rem', textAlign: 'left' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Estado</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#22c55e', letterSpacing: '0.1em' }}>PAGO RECIBIDO</span>
              </div>
            </div>

            {planLabel && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Plan</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-primary)', letterSpacing: '0.08em' }}>Almacenamiento {planLabel}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Fecha de pago</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-primary)', letterSpacing: '0.08em' }}>{getTodayFormatted()}</span>
            </div>

            <div style={{ height: '1px', background: 'var(--border)' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Ciclo de cobro</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.08em' }}>Mensual</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Próximo cobro</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 500, letterSpacing: '0.08em' }}>{getNextBillingDate()}</span>
            </div>
          </div>
        </div>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '2rem' }}>
          Recibirá un correo de confirmación con los detalles de su suscripción.
        </p>

        <a
          href="/"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'var(--accent)', color: '#07070d',
            fontFamily: 'var(--font-body)', fontWeight: 700,
            fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '0.9rem 1.8rem', border: 'none', cursor: 'pointer',
            clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)',
            textDecoration: 'none', transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#e8a820')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--accent)')}
        >
          Volver al inicio
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  )
}
