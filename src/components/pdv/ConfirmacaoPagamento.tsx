"use client"

import { useState } from "react"
import { CheckCircle2 } from "lucide-react"
import { Modal } from "@/components/ui/Modal"
import { Button } from "@/components/ui/Button"
import type { CartItem } from "@/types/produto"

interface ConfirmacaoPagamentoProps {
  open: boolean
  onClose: () => void
  onNewAtendimento: () => void
  items: CartItem[]
  total: number
}

function formatBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

export function ConfirmacaoPagamento({
  open,
  onClose,
  onNewAtendimento,
  items,
  total,
}: ConfirmacaoPagamentoProps) {
  const [success, setSuccess] = useState(false)
  const totalItens = items.reduce((sum, item) => sum + item.quantidade, 0)

  function handleClose() {
    setSuccess(false)
    onClose()
  }

  function handleConfirm() {
    setSuccess(true)
  }

  function handleNewAtendimento() {
    setSuccess(false)
    onNewAtendimento()
  }

  if (success) {
    return (
      <Modal open={open} onClose={handleClose} title="Pagamento Confirmado">
        <div className="flex flex-col items-center gap-6 py-4">
          <CheckCircle2 size={64} className="text-success" />
          <div className="text-center">
            <p className="text-sm text-muted uppercase tracking-wider font-display font-semibold mb-1">
              Total Pago
            </p>
            <p className="font-display font-bold text-5xl text-primary">{formatBRL(total)}</p>
          </div>
          <Button variant="primary" onClick={handleNewAtendimento} className="w-full py-3 text-base">
            Novo Atendimento
          </Button>
        </div>
      </Modal>
    )
  }

  return (
    <Modal open={open} onClose={handleClose} title="Confirmar Pagamento">
      <div className="flex flex-col gap-6">
        <div className="bg-dark border border-border rounded-md px-5 py-4 flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted font-display font-semibold uppercase tracking-wider">Itens</span>
            <span className="text-white font-semibold">{totalItens}</span>
          </div>
          <div className="flex justify-between items-center border-t border-border pt-2 mt-1">
            <span className="text-muted font-display font-semibold uppercase tracking-wider text-sm">Total</span>
            <span className="font-display font-bold text-3xl text-primary">{formatBRL(total)}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="ghost" onClick={handleClose} className="flex-1">
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirm} className="flex-1">
            Confirmar Pagamento
          </Button>
        </div>
      </div>
    </Modal>
  )
}
