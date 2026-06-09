"use client"

import { useState, useCallback } from "react"
import { EntradaProduto } from "@/components/pdv/EntradaProduto"
import { Carrinho } from "@/components/pdv/Carrinho"
import { ConfirmacaoPagamento } from "@/components/pdv/ConfirmacaoPagamento"
import type { CartItem, Produto } from "@/types/produto"

export default function PagamentoPage() {
  const [items, setItems] = useState<CartItem[]>([])
  const [confirmOpen, setConfirmOpen] = useState(false)

  const total = items.reduce((sum, item) => sum + item.produto.valor * item.quantidade, 0)

  const handleAdd = useCallback((produto: Produto, quantidade: number) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.produto.id === produto.id)
      if (idx >= 0) {
        const updated = [...prev]
        updated[idx] = {
          ...updated[idx],
          quantidade: Math.min(999, updated[idx].quantidade + quantidade),
        }
        return updated
      }
      return [...prev, { produto, quantidade }]
    })
  }, [])

  const handleRemove = useCallback((produtoId: string) => {
    setItems((prev) => prev.filter((i) => i.produto.id !== produtoId))
  }, [])

  const handleClear = useCallback(() => {
    setItems([])
  }, [])

  const handleNewAtendimento = useCallback(() => {
    setItems([])
    setConfirmOpen(false)
  }, [])

  return (
    <div className="flex flex-col md:flex-row md:h-screen md:overflow-hidden">
      {/* Painel esquerdo — Entrada (40%) */}
      <div className="md:w-[40%] p-6 border-b md:border-b-0 md:border-r border-border md:overflow-y-auto">
        <EntradaProduto onAdd={handleAdd} />
      </div>

      {/* Painel direito — Carrinho (60%) */}
      <div className="md:w-[60%] p-6 flex flex-col md:overflow-hidden">
        <Carrinho
          items={items}
          onRemove={handleRemove}
          onFinalize={() => setConfirmOpen(true)}
          onClear={handleClear}
        />
      </div>

      <ConfirmacaoPagamento
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onNewAtendimento={handleNewAtendimento}
        items={items}
        total={total}
      />
    </div>
  )
}
