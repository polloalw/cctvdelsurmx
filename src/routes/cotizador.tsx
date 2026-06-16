import { createFileRoute } from '@tanstack/react-router'
import Quoter from '../components/Quoter'

export const Route = createFileRoute('/cotizador')({
  component: CotizadorPage,
})

function CotizadorPage() {
  return <Quoter />
}
