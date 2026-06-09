"use client"

import { useState } from "react"
import { X, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/Button"
import type { CartItem } from "@/types/produto"

interface CarrinhoProps {
  items: CartItem[]
  onRemove: (produtoId: string) => void
  onFinalize: () => void
  onClear: () => void
}

function formatBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

export function Carrinho({ items, onRemove, onFinalize, onClear }: CarrinhoProps) {
  const [confirmClear, setConfirmClear] = useState(false)
  const total = items.reduce((sum, item) => sum + item.produto.valor * item.quantidade, 0)
  const totalItens = items.reduce((sum, item) => sum + item.quantidade, 0)

  function handleClearConfirm() {
    onClear()
    setConfirmClear(false)
  }

  return (
    <div className="flex flex-col h-full">
      <h2 className="font-display font-bold text-sm uppercase tracking-widest text-muted mb-4">
        Carrinho
      </h2>

      {/* Lista de itens */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 h-40 text-muted">
            <ShoppingCart size={36} className="opacity-30" />
            <p className="text-sm font-display font-semibold uppercase tracking-wider">
              Carrinho vazio
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left pb-2 text-xs font-display font-semibold uppercase tracking-wider text-muted">Cód.</th>
                <th className="text-left pb-2 text-xs font-display font-semibold uppercase tracking-wider text-muted">Descrição</th>
                <th className="text-center pb-2 text-xs font-display font-semibold uppercase tracking-wider text-muted">Qtd</th>
                <th className="text-right pb-2 text-xs font-display font-semibold uppercase tracking-wider text-muted">Unit.</th>
                <th className="text-right pb-2 text-xs font-display font-semibold uppercase tracking-wider text-muted">Subtotal</th>
                <th className="pb-2" />
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.produto.id} className="border-b border-border even:bg-white/[0.02]">
                  <td className="py-2.5 pr-2 font-display font-semibold text-primary tracking-wider whitespace-nowrap">
                    {item.produto.codigo}
                  </td>
                  <td className="py-2.5 pr-2 text-white max-w-[140px] truncate">{item.produto.descricao}</td>
                  <td className="py-2.5 text-center font-display font-bold text-white">{item.quantidade}</td>
                  <td className="py-2.5 text-right text-muted whitespace-nowrap">{formatBRL(item.produto.valor)}</td>
                  <td className="py-2.5 pl-2 text-right font-display font-semibold text-white whitespace-nowrap">
                    {formatBRL(item.produto.valor * item.quantidade)}
                  </td>
                  <td className="py-2.5 pl-2">
                    <button
                      onClick={() => onRemove(item.produto.id)}
                      aria-label={`Remover ${item.produto.descricao}`}
                      className="text-muted hover:text-danger transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Total e ações */}
      <div className="pt-4 border-t border-border mt-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-display font-semibold uppercase tracking-wider text-muted">
            {totalItens} {totalItens === 1 ? "item" : "itens"}
          </span>
          <span className="font-display font-bold text-5xl text-primary leading-none">
            {formatBRL(total)}
          </span>
        </div>

        <Button
          variant="primary"
          onClick={onFinalize}
          disabled={items.length === 0}
          className="w-full py-3 text-base"
        >
          Finalizar Pagamento
        </Button>

        {/* LIMPAR */}
        {confirmClear ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted flex-1">Zerar o carrinho?</span>
            <button
              onClick={handleClearConfirm}
              className="text-xs font-display font-bold uppercase text-danger hover:text-red-400 transition-colors"
            >
              Sim
            </button>
            <button
              onClick={() => setConfirmClear(false)}
              className="text-xs font-display font-bold uppercase text-muted hover:text-white transition-colors"
            >
              Não
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmClear(true)}
            disabled={items.length === 0}
            className="text-xs font-display font-semibold uppercase tracking-wider text-muted hover:text-danger transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-center"
          >
            Limpar carrinho
          </button>
        )}
      </div>
    </div>
  )
}
