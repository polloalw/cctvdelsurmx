import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cotizador')({
  component: Cotizador,
})

function Cotizador() {
  return (
    <div style={{ padding: 20 }}>
      <h1>COTIZADOR CARGÓ CORRECTAMENTE</h1>
    </div>
  )
}
