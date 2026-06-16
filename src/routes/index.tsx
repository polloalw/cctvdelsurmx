import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

// ── SVG Icons ────────────────────────────────────────────────────────────────
const IconCamera = ({ size = 22 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M23 7l-7 5 7 5V7z" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
)

const IconShield = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

const IconFingerprint = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4"/>
    <path d="M5 19.5C5.5 18 6 15 6 12c0-1.6.6-3 1.7-4"/>
    <path d="M10 21.9C10 21.9 10 18 10 12c0-1.1.9-2 2-2s2 .9 2 2v3"/>
    <path d="M14 21.9C14 21.9 15 16 15 12c0-3.3-2.7-6-6-6-1.1 0-2.2.3-3.1.8"/>
    <path d="M18 9c.5 1 .7 2 .7 3 0 6.3-3 11-7.1 13.3"/>
    <path d="M20 6c1.2 2 2 4.4 2 7 0 2.7-.7 5.3-2 7.4"/>
  </svg>
)

const IconNetwork = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="2" width="6" height="4" rx="1"/><rect x="16" y="10" width="6" height="4" rx="1"/>
    <rect x="2" y="10" width="6" height="4" rx="1"/><rect x="9" y="18" width="6" height="4" rx="1"/>
    <path d="M12 6v4m0 4v4m-6-2h3m6 0h3M6 12H3m18 0h-3"/>
  </svg>
)

const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

const IconPhone = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1l-1.3 1.3a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7A2 2 0 0 1 22 16.9z"/>
  </svg>
)

const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/>
  </svg>
)

const IconMapPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)

const IconEye = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
)

const IconLock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)

const IconCloud = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
  </svg>
)

const IconDatabase = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
)

// ── Data ─────────────────────────────────────────────────────────────────────
const services = [
  {
    id: 'cctv',
    icon: <IconCamera />,
    title: 'CCTV',
    subtitle: 'Videovigilancia HD',
    desc: 'Sistemas de cámaras analógicas, IP y 4K con grabación continua en la nube o local. Cobertura total con visión nocturna, detección de movimiento y alertas en tiempo real.',
    features: ['Resolución 4K / 2MP / 5MP', 'Visión nocturna infrarroja', 'Grabación cloud + NVR local', 'Acceso remoto desde móvil'],
    tag: 'SRV-001',
  },
  {
    id: 'vigilancia',
    icon: <IconEye />,
    title: 'VIGILANCIA',
    subtitle: 'Monitoreo Inteligente',
    desc: 'Centro de monitoreo con análisis de video por inteligencia artificial. Detección de intrusos, reconocimiento de placas vehiculares y generación automática de reportes.',
    features: ['IA para detección de anomalías', 'Lectura de placas (LPR)', 'Monitoreo 24/7 con operadores', 'Reportes automáticos'],
    tag: 'SRV-002',
  },
  {
    id: 'biometrico',
    icon: <IconFingerprint />,
    title: 'ACCESOS BIOMÉTRICOS',
    subtitle: 'Control de Acceso',
    desc: 'Torniquetes, lectores de huella dactilar, reconocimiento facial y tarjetas RFID integrados con software de gestión de personal y asistencia.',
    features: ['Reconocimiento facial & huella', 'Tarjetas RFID / NFC', 'Software de asistencia', 'Integración con nómina'],
    tag: 'SRV-003',
  },
  {
    id: 'redes',
    icon: <IconNetwork />,
    title: 'REDES',
    subtitle: 'Infraestructura IT',
    desc: 'Diseño, instalación y mantenimiento de redes LAN/WAN, cableado estructurado Cat6/Cat6A, switches gestionados, Wi-Fi empresarial y segmentación VLAN.',
    features: ['Cableado estructurado Cat6/6A', 'Wi-Fi empresarial 802.11ax', 'Switches & routers gestionados', 'Seguridad perimetral Firewall'],
    tag: 'SRV-004',
  },
]

const stats = [
  { value: '1.200+', label: 'Proyectos ejecutados' },
  { value: '98.7%', label: 'Disponibilidad garantizada' },
  { value: '14', label: 'Años en el mercado' },
  { value: '340+', label: 'Clientes activos' },
]

const storagePlans = [
  {
    capacity: '50',
    unit: 'GB',
    price: '$295.80',
    currency: 'COP/mes',
    features: ['50 GB de grabación en la nube: por movimiento o continuo directamente desde XVR/NVR (sin puerto de enlace (no requiere gateway) Hasta 4 canales por disco duro', 'Acceso remoto 24/7', 'Encriptación AES-256', '1 usuario incluido'],
    paymentUrl: 'https://www.mercadopago.com.mx/subscriptions/checkout?preapproval_plan_id=72fbbc63f23a40b9944abdeed681f9ad',
    tag: 'STR-050',
  },
  {
    capacity: '100',
    unit: 'GB',
    price: '$510.40',
    currency: 'COP/mes',
    features: ['00 GB de grabación en la nube: por movimiento o continuo directamente desde XVR/NVR (sin puerto de enlace (no requiere gateway) Hasta 8 canales por disco duro.', 'Acceso remoto 24/7', 'Encriptación AES-256', '3 usuarios incluidos'],
    paymentUrl: 'https://www.mercadopago.com.mx/subscriptions/checkout?preapproval_plan_id=72fbbc63f23a40b9944abdeed681f9ad',
    tag: 'STR-100',
    popular: true,
  },
  {
    capacity: '150',
    unit: 'GB',
    price: '$792.55',
    currency: 'COP/mes',
    features: ['50 GB de grabación en la nube: por movimiento o continuo directamente desde XVR/NVR (sin puerto de enlace (no requiere gateway) Hasta 16 canales por disco duro', 'Acceso remoto 24/7', 'Encriptación AES-256', '5 usuarios incluidos'],
    paymentUrl: 'https://www.mercadopago.com.mx/subscriptions/checkout?preapproval_plan_id=018f13282f764168a243d8154dc59ac7',
    tag: 'STR-150',
  },
  {
    capacity: '200',
    unit: 'GB',
    price: '$1,100.00',
    currency: 'COP/mes',
    features: ['250 GB de grabación en la nube: por movimiento o continuo directamente desde XVR/NVR (sin puerto de enlace (no requiere gateway) Sin límite de canales', 'Acceso remoto 24/7', 'Encriptación AES-256', 'Usuarios ilimitados'],
    paymentUrl: 'https://www.mercadopago.com.mx/subscriptions/checkout?preapproval_plan_id=528ded995dc3416aa9ea8eebbb9559a5',
    tag: 'STR-200',
  },
]

const whyItems = [
  { title: 'Integración total', desc: 'CCTV, accesos y red en una sola plataforma unificada con panel único de control.' },
  { title: 'Soporte 24/7', desc: 'Técnicos certificados disponibles todo el año para mantenimiento preventivo y correctivo.' },
  { title: 'Garantía extendida', desc: 'Todos nuestros equipos cuentan con garantía de 3 años y respaldo de marcas líderes.' },
  { title: 'Certificaciones', desc: 'Instaladores certificados por Hikvision, Dahua, Axis, Cisco y Ubiquiti.' },
  { title: 'Escalabilidad', desc: 'Sistemas diseñados para crecer con su empresa sin reemplazar la infraestructura existente.' },
  { title: 'Sin letra pequeña', desc: 'Propuestas detalladas, precios fijos y cronogramas de entrega claros desde el inicio.' },
]

// ── Component ─────────────────────────────────────────────────────────────────
function HomePage() {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    telefono: '',
    servicio: '',
    mensaje: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const mensaje = `
Nuevo contacto:

Nombre: ${formData.nombre}
Empresa: ${formData.empresa}
Teléfono: ${formData.telefono}
Servicio: ${formData.servicio}
Mensaje: ${formData.mensaje}
    `

    const telefonoWhatsApp = "5215580043470"

    const url = `https://wa.me/${telefonoWhatsApp}?text=${encodeURIComponent(mensaje)}`

    window.open(url, "_blank")

    setSubmitted(true)
  }
return (
  <div style={{ background: 'var(--bg-base)', minHeight: '100vh' }}>
  
{/* ── NAV ─────────────────────────────────────────────────── */}
<nav style={{
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  background: 'rgba(7,7,13,0.88)',
  backdropFilter: 'blur(16px)',
  borderBottom: '1px solid var(--border)',
}}>
  <div style={{
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 2rem',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }}>

    {/* Logo */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <img
        src="/logocctvdelsur.png"
        alt="CCTV del Sur"
        style={{
          height: '50px',
          width: 'auto',
          display: 'block',
        }}
      />

      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.5rem',
          letterSpacing: '0.1em',
          color: 'var(--text-primary)',
        }}
      >
        CCTV DEL SUR
      </span>

      <span
        className="hide-mobile"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.1em',
          marginTop: '2px',
        }}
      >
        SISTEMAS DE SEGURIDAD
      </span>
    </div>

    {/* Nav links */}
    <div
      style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}
      className="hide-mobile"
    >
{[
  ['Servicios', '#servicios'],
  ['Almacenamiento', '#almacenamiento'],
  ['Nosotros', '#nosotros'],
  ['Contacto', '#contacto'],

].map(([texto, enlace]) => (
  <a
    key={texto}
    href={enlace}
    className="nav-link"
    style={{
      fontFamily: 'var(--font-body)',
      color: 'var(--text-secondary)',
      textDecoration: 'none',
      fontSize: '0.82rem',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      fontWeight: 500,
    }}
  >
    {texto}
  </a>
))}
    </div>

<a
  href="/cotizador"
  className="btn-primary"
  style={{ fontSize: '0.75rem', padding: '0.65rem 1.25rem' }}
>
  Cotizar ahora
</a>

  </div>
</nav>
      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="grid-bg scanlines" style={{
        position: 'relative',
        minHeight: '100vh',
        paddingTop: '64px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
        {/* Gradient blobs */}
        <div style={{ position: 'absolute', top: '15%', right: '5%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,147,10,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '20%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,57,43,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 2rem', width: '100%', position: 'relative', zIndex: 3 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', alignItems: 'center' }}>

            {/* Left: copy */}
            <div>
              {/* Live status */}
              <div className="anim d1" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2rem' }}>
                <div className="live-dot" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.2em', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  Monitoreo activo — 24/7
                </span>
              </div>

              <h1 className="anim d2" style={{ fontSize: 'clamp(3.5rem, 7vw, 6.5rem)', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                PROTEGE
              </h1>
              <h1 className="anim d3" style={{ fontSize: 'clamp(3.5rem, 7vw, 6.5rem)', color: 'var(--accent)' }}>
                LO QUE
              </h1>
              <h1 className="anim d4" style={{ fontSize: 'clamp(3.5rem, 7vw, 6.5rem)', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
                MÁS IMPORTA
              </h1>

              <p className="anim d5" style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '480px', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                Soluciones integrales en CCTV, videovigilancia inteligente, control de accesos biométricos e infraestructura de redes para empresas, industrias e instituciones.
              </p>

              <div className="anim d6" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#contacto" className="btn-primary">
                  Solicitar diagnóstico gratuito <IconArrow />
                </a>
                <a href="#servicios" className="btn-outline">
                  Ver soluciones
                </a>
              </div>

              {/* Trust badges */}
              <div className="anim d7" style={{ display: 'flex', gap: '1.5rem', marginTop: '3rem', flexWrap: 'wrap' }}>
                {['Hikvision', 'Dahua', 'Cisco', 'Ubiquiti'].map(brand => (
                  <div key={brand} style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em',
                    color: 'var(--text-muted)', textTransform: 'uppercase', padding: '0.4rem 0.8rem',
                    border: '1px solid var(--border)', background: 'var(--bg-surface)',
                  }}>
                    {brand}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: mock CCTV feed UI */}
            <div className="anim d5 hide-mobile" style={{ position: 'relative' }}>
              <div style={{ position: 'relative', background: 'var(--bg-surface)', border: '1px solid var(--border)', padding: '1.5rem' }}>
                <div className="corner-mark tl" />
                <div className="corner-mark br" />

                {/* Header bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div className="live-dot" />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-secondary)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                      CCTV del Sur — Panel de control
                    </span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.1em' }}>
                    REC ●
                  </span>
                </div>

                {/* Camera grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px', marginBottom: '1rem' }}>
                  {[
                    { label: 'CAM-01 · Entrada principal', active: true },
                    { label: 'CAM-02 · Parking', active: true },
                    { label: 'CAM-03 · Bodega', active: false },
                    { label: 'CAM-04 · Perímetro norte', active: true },
                  ].map((cam, i) => (
                    <div key={i} style={{
                      aspect: '4/3', background: cam.active ? '#0d1520' : '#0a0a0f',
                      border: `1px solid ${cam.active ? 'var(--border-bright)' : 'var(--border)'}`,
                      position: 'relative', overflow: 'hidden',
                      paddingBottom: '56%',
                    }}>
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0.5rem' }}>
                        {cam.active ? (
                          <>
                            {/* Simulated camera view */}
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #0d1520 0%, #0a1028 100%)' }}>
                              {/* Grid lines */}
                              <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.15 }}>
                                {[30, 60].map(y => <line key={y} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="#4466aa" strokeWidth="0.5"/>)}
                                {[33, 66].map(x => <line key={x} x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%" stroke="#4466aa" strokeWidth="0.5"/>)}
                                <ellipse cx="50%" cy="60%" rx="25%" ry="15%" fill="rgba(68,136,255,0.04)" stroke="rgba(68,136,255,0.1)" strokeWidth="1"/>
                              </svg>
                            </div>
                            <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: '#22c55e', letterSpacing: '0.05em' }}>EN VIVO</span>
                              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'rgba(255,255,255,0.5)' }}>1080p</span>
                            </div>
                            <div style={{ position: 'relative', zIndex: 1 }}>
                              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em' }}>{cam.label}</div>
                            </div>
                          </>
                        ) : (
                          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(90,90,122,0.6)" strokeWidth="1.5"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>SIN SEÑAL</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Status bar */}
                <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '1.5rem' }}>
                    {[
                      { label: 'Cámaras activas', val: '3/4' },
                      { label: 'Alertas hoy', val: '2' },
                      { label: 'Almacenamiento', val: '74%' },
                    ].map(item => (
                      <div key={item.label}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{item.label}</div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--accent)', letterSpacing: '0.05em' }}>{item.val}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <IconLock />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#22c55e', letterSpacing: '0.1em' }}>SEGURO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ───────────────────────────────────────────── */}
      <div style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            {stats.map((stat, i) => (
              <div key={i} style={{
                padding: '2rem 1.5rem',
                borderRight: i < 3 ? '1px solid var(--border)' : 'none',
                textAlign: 'center',
              }}>
                <div className="stat-num">{stat.value}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '0.4rem' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SERVICES ────────────────────────────────────────────── */}
      <section id="servicios" style={{ padding: '7rem 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ marginBottom: '4rem' }}>
            <div className="section-tag" style={{ marginBottom: '1.25rem' }}>Soluciones</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--text-primary)', maxWidth: '520px' }}>
                CUATRO LÍNEAS,<br />
                <span style={{ color: 'var(--accent)' }}>UN SOLO INTEGRADOR</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '380px', fontSize: '0.95rem', lineHeight: 1.7 }}>
                Diseñamos, instalamos y mantenemos cada componente de su infraestructura de seguridad con personal certificado y equipos de primera línea.
              </p>
            </div>
          </div>

          <div
  style={{
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1px',
    background: 'var(--border)',
  }}
  className="md:grid-cols-2"
>
            {services.map((svc) => (
              <div key={svc.id} className="service-card" style={{ padding: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <div className="icon-hex" style={{ color: 'var(--accent)' }}>
                    {svc.icon}
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.15em' }}>{svc.tag}</span>
                </div>

                <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{svc.title}</h3>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>{svc.subtitle}</div>

                <div className="accent-bar" style={{ marginBottom: '1.25rem' }} />

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>{svc.desc}</p>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {svc.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                      <span style={{ color: 'var(--accent)', flexShrink: 0 }}><IconCheck /></span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY FORTIS ──────────────────────────────────────────── */}
      <section id="nosotros" style={{ padding: '7rem 2rem', background: 'var(--bg-surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '5rem', alignItems: 'flex-start' }}>

            <div style={{ position: 'sticky', top: '5rem' }}>
              <div className="section-tag" style={{ marginBottom: '1.25rem' }}>Por qué elegimos Fortis</div>
              <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
                COMPROMISO<br />
                <span style={{ color: 'var(--accent)' }}>REAL CON</span><br />
                SU SEGURIDAD
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '2rem' }}>
                Más de 14 años instalando sistemas que realmente funcionan. Sin intermediarios, sin subcontratos. Nuestros técnicos son empleados propios certificados directamente por los fabricantes.
              </p>
              <a href="#contacto" className="btn-primary">
                Hablar con un asesor <IconArrow />
              </a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {whyItems.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', gap: '1.25rem', padding: '1.5rem 0',
                  borderBottom: i < whyItems.length - 1 ? '1px solid var(--border)' : 'none',
                  alignItems: 'flex-start',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent)',
                    letterSpacing: '0.12em', marginTop: '0.3rem', flexShrink: 0, minWidth: '28px',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.4rem', letterSpacing: '0.04em' }}>{item.title}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.65 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ────────────────────────────────────────────── */}
      <section style={{
        padding: '5rem 2rem',
        background: `linear-gradient(135deg, #0f0a00 0%, #07070d 50%, #100a00 100%)`,
        borderBottom: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '700px', height: '300px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(212,147,10,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div className="section-tag" style={{ justifyContent: 'center', marginBottom: '1.5rem' }}>
            Diagnóstico sin costo
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            EVALUAMOS SU EMPRESA<br />
            <span style={{ color: 'var(--accent)' }}>SIN COMPROMISO</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '540px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            Nuestros asesores visitan sus instalaciones, identifican vulnerabilidades y entregan un informe técnico con propuesta de solución en 48 horas.
          </p>
          <a href="#contacto" className="btn-primary" style={{ fontSize: '0.85rem', padding: '1rem 2.25rem' }}>
            Agendar visita técnica gratuita <IconArrow />
          </a>
        </div>
      </section>

      {/* ── CLOUD STORAGE ───────────────────────────────────────── */}
      <section id="almacenamiento" style={{ padding: '7rem 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <div className="section-tag" style={{ justifyContent: 'center', marginBottom: '1.25rem' }}>Almacenamiento</div>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--text-primary)', marginBottom: '1rem' }}>
              ALMACENAMIENTO<br />
              <span style={{ color: 'var(--accent)' }}>EN LA NUBE</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.7 }}>
              Respaldo seguro de sus grabaciones con acceso desde cualquier lugar. Elija el plan que se adapte a las necesidades de su operación.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr)', gap: '1rem' }}>
            {storagePlans.map((plan) => (
              <div key={plan.tag} className={`pricing-card ${plan.popular ? 'pricing-popular' : ''}`}>
                {plan.popular && (
                  <div style={{
                    position: 'absolute', top: '0', left: '0', right: '0',
                    background: 'var(--accent)', padding: '0.4rem 0',
                    fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: '#07070d', fontWeight: 700, textAlign: 'center',
                  }}>
                    Más popular
                  </div>
                )}
                <div style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', marginTop: plan.popular ? '0.5rem' : 0 }}>
                    <div className="icon-hex" style={{ color: 'var(--accent)' }}>
                      <IconCloud />
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.15em' }}>{plan.tag}</span>
                  </div>

                  <div style={{ marginBottom: '0.5rem' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 4vw, 4rem)', color: 'var(--text-primary)', lineHeight: 1 }}>{plan.capacity}</span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--accent)', marginLeft: '0.25rem' }}>{plan.unit}</span>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--accent)' }}>{plan.price}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', marginLeft: '0.5rem', letterSpacing: '0.1em' }}>{plan.currency}</span>
                  </div>

                  <div className="accent-bar" style={{ marginBottom: '1.25rem' }} />

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem', flex: 1 }}>
                    {plan.features.map(f => (
                      <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.825rem' }}>
                        <span style={{ color: 'var(--accent)', flexShrink: 0 }}><IconCheck /></span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={plan.paymentUrl}
                    className={plan.popular ? 'btn-primary' : 'btn-outline'}
                    style={{ width: '100%', justifyContent: 'center', padding: '0.85rem 1rem', fontSize: '0.75rem' }}
                  >
                    Contratar plan <IconArrow />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
              Cobro mensual automático · Cancela en cualquier momento · Soporte técnico incluido
            </p>
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ────────────────────────────────────────── */}
      <section id="contacto" style={{ padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem', alignItems: 'flex-start' }}>

            {/* Left: info */}
            <div>
              <div className="section-tag" style={{ marginBottom: '1.25rem' }}>Contacto</div>
              <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
                HABLEMOS DE<br />
                <span style={{ color: 'var(--accent)' }}>SU PROYECTO</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '3rem' }}>
                Complete el formulario y un asesor especializado se comunicará en menos de 2 horas durante horario hábil para coordinar su diagnóstico gratuito.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { icon: <IconPhone />, label: 'Teléfono', val: '+52 5580043470' },
                  { icon: <IconMail />, label: 'Correo electrónico', val: 'contacto@cctvdelsur.mx' },
                  { icon: <IconMapPin />, label: 'Cobertura', val: 'México · Ciudad de México · Todos los estados de la republica' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div className="icon-hex" style={{ color: 'var(--accent)', width: '40px', height: '40px' }}>{item.icon}</div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>{item.label}</div>
                      <div style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hours */}
              <div style={{ marginTop: '2.5rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', padding: '1.25rem 1.5rem', position: 'relative' }}>
                <div className="corner-mark tl" />
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Horario de atención</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.8 }}>
                  Lunes — Viernes: 7:00 am — 6:00 pm<br />
                  Sábados: 10:00 am — 17:00 pm<br />
                  <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>Soporte técnico: 24/7</span>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div style={{ position: 'relative' }}>
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', padding: '2.5rem', position: 'relative' }}>
                <div className="corner-mark tl" />
                <div className="corner-mark br" />

                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <div style={{ width: '64px', height: '64px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)' }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <h3 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>MENSAJE ENVIADO</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                      Gracias por contactarnos. Un asesor se comunicará con usted en menos de 2 horas.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label className="form-label">Nombre completo *</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="Carlos Rodríguez"
                          value={formData.nombre}
                          onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="form-label">Empresa</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="Nombre de su empresa"
                          value={formData.empresa}
                          onChange={e => setFormData({ ...formData, empresa: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="form-label">Teléfono / WhatsApp *</label>
                      <input
                        type="tel"
                        className="form-input"
                        placeholder="+57 300 000 0000"
                        value={formData.telefono}
                        onChange={e => setFormData({ ...formData, telefono: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <label className="form-label">Servicio de interés *</label>
                      <select
                        className="form-input"
                        value={formData.servicio}
                        onChange={e => setFormData({ ...formData, servicio: e.target.value })}
                        required
                      >
                        <option value="">Seleccione una opción</option>
                        <option value="cctv">CCTV / Videovigilancia</option>
                        <option value="vigilancia">Monitoreo inteligente</option>
                        <option value="biometrico">Accesos biométricos</option>
                        <option value="redes">Redes e infraestructura IT</option>
                        <option value="integral">Solución integral</option>
                      </select>
                    </div>

                    <div>
                      <label className="form-label">Descripción del proyecto</label>
                      <textarea
                        className="form-input"
                        placeholder="Cuéntenos sobre sus instalaciones, número de puntos de acceso, área a cubrir, etc."
                        rows={4}
                        value={formData.mensaje}
                        onChange={e => setFormData({ ...formData, mensaje: e.target.value })}
                        style={{ resize: 'vertical' }}
                      />
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}>
                      Enviar solicitud de diagnóstico <IconArrow />
                    </button>

                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', textAlign: 'center', letterSpacing: '0.08em' }}>
                      Sus datos están protegidos. No compartimos información con terceros.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border)',
        padding: '3rem 2rem 2rem',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', marginBottom: '3rem' }}>

             
<div style={{
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  marginBottom: '1rem'
}}>
  <img
    src="/logocctvdelsur.png"
    alt="CCTV del Sur"
    style={{
      height: '50px',
      width: 'auto',
      display: 'block',
    }}
  />

  <div>
    <span
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.4rem',
        letterSpacing: '0.1em',
        color: 'var(--text-primary)',
        display: 'block',
      }}
    >
      CCTV DEL SUR
    </span>

    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        color: 'var(--text-muted)',
        letterSpacing: '0.1em',
      }}
    >
      SISTEMAS DE SEGURIDAD
    </span>
  </div>
</div>
            {[
              { title: 'Servicios', links: ['CCTV', 'Videovigilancia', 'Accesos biométricos', 'Redes & IT'] },
              { title: 'Empresa', links: ['Nosotros', 'Certificaciones', 'Proyectos', 'Blog técnico'] },
              { title: 'Soporte', links: ['Mesa de ayuda', 'Mantenimiento', 'Garantías', 'Contáctenos'] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem' }}>{col.title}</div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {col.links.map(link => (
                    <li key={link}>
                      <a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="accent-bar" style={{ marginBottom: '1.5rem' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
              © 2025 CCTV DEL SUR  — Todos los derechos reservados.
            </span>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['Política de privacidad', 'Términos de servicio'].map(link => (
                <a key={link} href="#" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', textDecoration: 'none', letterSpacing: '0.08em' }}>{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
