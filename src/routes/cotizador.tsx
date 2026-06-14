import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cotizador')({
  component: CotizadorPage,
})

function CotizadorPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#07070d',
        color: 'white',
        padding: '40px',
      }}
    >
      <h1>Cotizador CCTV del Sur</h1>

      <p>
        Bienvenido al cotizador en línea.
      </p>

      <p>
        Aquí podrás seleccionar equipos y solicitar una cotización personalizada.
      </p>
    </div>
  )
}
