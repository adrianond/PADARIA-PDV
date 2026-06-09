"use client"

import { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from "react"
import { Search, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { getProdutoByCodigo } from "@/lib/produtos"
import type { Produto } from "@/types/produto"

interface EntradaProdutoProps {
  onAdd: (produto: Produto, quantidade: number) => void
}

function formatBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

export function EntradaProduto({ onAdd }: EntradaProdutoProps) {
  const [codigo, setCodigo] = useState("")
  const [quantidade, setQuantidade] = useState(1)
  const [preview, setPreview] = useState<Produto | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [searching, setSearching] = useState(false)
  const codigoRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    codigoRef.current?.focus()
  }, [])

  function reset() {
    setCodigo("")
    setQuantidade(1)
    setPreview(null)
    setNotFound(false)
    setTimeout(() => codigoRef.current?.focus(), 30)
  }

  async function handleSearch() {
    if (!codigo.trim()) return
    setNotFound(false)
    setSearching(true)
    try {
      const produto = await getProdutoByCodigo(codigo.trim())
      if (!produto) {
        setNotFound(true)
        setPreview(null)
      } else {
        setPreview(produto)
        setNotFound(false)
      }
    } finally {
      setSearching(false)
    }
  }

  function handleConfirmAdd() {
    if (!preview) return
    onAdd(preview, quantidade)
    reset()
  }

  function handleSubmit() {
    if (preview) {
      handleConfirmAdd()
    } else {
      handleSearch()
    }
  }

  function handleCodigoKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") { e.preventDefault(); handleSubmit() }
    if (e.key === "Escape") reset()
  }

  function handleQuantidadeChange(e: ChangeEvent<HTMLInputElement>) {
    const v = parseInt(e.target.value, 10)
    if (!isNaN(v)) setQuantidade(Math.min(999, Math.max(1, v)))
  }

  function handleCodigoChange(e: ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.toUpperCase()
    setCodigo(val)
    // reset preview when typing changes the code
    if (preview) { setPreview(null); setNotFound(false) }
  }

  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-display font-bold text-sm uppercase tracking-widest text-muted">
        Entrada de Produto
      </h2>

      {/* Código */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-display font-semibold uppercase tracking-wider text-muted">
          Código do Produto
        </label>
        <input
          ref={codigoRef}
          value={codigo}
          onChange={handleCodigoChange}
          onKeyDown={handleCodigoKeyDown}
          placeholder="Ex: PAO001"
          className={`
            w-full bg-surface border rounded-md px-4 py-3 text-2xl font-display font-bold
            text-white placeholder:text-border tracking-widest uppercase
            transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
            ${notFound ? "border-danger" : preview ? "border-success" : "border-border"}
          `}
        />
        {notFound && (
          <span className="text-xs text-danger font-semibold">Produto não encontrado</span>
        )}
      </div>

      {/* Quantidade */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-display font-semibold uppercase tracking-wider text-muted">
          Quantidade
        </label>
        <input
          type="number"
          min={1}
          max={999}
          value={quantidade}
          onChange={handleQuantidadeChange}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="w-full bg-surface border border-border rounded-md px-4 py-3 text-xl font-display font-bold text-white
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
        />
      </div>

      {/* Preview do produto encontrado */}
      {preview && (
        <div className="flex items-start gap-3 bg-success/10 border border-success/30 rounded-md px-4 py-3">
          <CheckCircle2 size={18} className="text-success shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-display font-semibold uppercase tracking-wider text-muted mb-0.5">
              {preview.codigo}
            </p>
            <p className="text-sm text-white truncate">{preview.descricao}</p>
            <p className="text-base font-display font-bold text-primary mt-0.5">
              {formatBRL(preview.valor)}
            </p>
          </div>
        </div>
      )}

      {/* Botão */}
      <Button
        variant="primary"
        onClick={handleSubmit}
        loading={searching}
        className="w-full py-3 text-base"
      >
        {preview ? (
          <><CheckCircle2 size={18} /> Adicionar ao Carrinho</>
        ) : (
          <><Search size={18} /> Buscar Produto</>
        )}
      </Button>

      <p className="text-xs text-muted text-center">
        Pressione <kbd className="px-1 py-0.5 bg-border rounded text-xs">Enter</kbd> para buscar ou adicionar
      </p>
    </div>
  )
}
