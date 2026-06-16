import { createFileRoute } from '@tanstack/react-router'
import Quoter from '../components/Quoter'

// 👇 aquí es donde se registra la ruta
export const Route = createFileRoute('/cotizador')({
  component: Cotizador,
})

function Cotizador() {
  return (
    <Quoter
      products={[]}
      settings={{} as any}
      projects={[]}
      onAddProject={async (p) => ({ id: '1', ...p, date: new Date().toISOString() } as any)}
      onPlaceProviderOrder={async () => ({ order: { providerOrderId: 'TEST' } })}
    />
  )
}
