"use client"

import { useState, useEffect, useRef, KeyboardEvent } from "react"
import { Search, X, PackageSearch } from "lucide-react"
import { ProdutoCard } from "@/components/consulta/ProdutoCard"
import { getProdutos, searchProdutos } from "@/lib/produtos"
import type { Produto } from "@/types/produto"

function CardSkeleton() {
  return (
    <div className="bg-surface border border-border rounded-lg p-4 flex flex-col gap-3 animate-pulse">
      <div className="h-6 w-20 bg-border rounded" />
      <div className="h-4 w-full bg-border rounded" />
      <div className="h-4 w-2/3 bg-border rounded" />
      <div className="h-7 w-24 bg-border rounded mt-1" />
    </div>
  )
}

export default function ConsultaPage() {
  const [query, setQuery] = useState("")
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  // Carrega todos os produtos na montagem
  useEffect(() => {
    getProdutos()
      .then(setProdutos)
      .finally(() => setLoading(false))
  }, [])

  // Debounce de 300ms para busca
  useEffect(() => {
    if (query.trim() === "") {
      setLoading(true)
      getProdutos()
        .then(setProdutos)
        .finally(() => setLoading(false))
      return
    }

    setLoading(true)
    const timer = setTimeout(() => {
      searchProdutos(query.trim())
        .then(setProdutos)
        .finally(() => setLoading(false))
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setQuery("")
      inputRef.current?.blur()
    }
  }

  const showHighlight = query.trim().length > 0

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Header */}
      <h1 className="font-display font-bold text-2xl uppercase tracking-wider text-white">
        Consulta de Produtos
      </h1>

      {/* Campo de busca */}
      <div className="relative">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
        />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite o código ou descrição..."
          className="w-full bg-surface border border-border rounded-lg pl-12 pr-12 py-4 text-lg text-white
            placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
            transition-colors"
        />
        {query && (
          <button
            onClick={() => { setQuery(""); inputRef.current?.focus() }}
            aria-label="Limpar busca"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Contador de resultados */}
      {!loading && (
        <p className="text-xs font-display font-semibold uppercase tracking-wider text-muted -mt-2">
          {produtos.length === 0
            ? "Nenhum resultado"
            : `${produtos.length} produto${produtos.length !== 1 ? "s" : ""}${showHighlight ? " encontrado" + (produtos.length !== 1 ? "s" : "") : ""}`}
        </p>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : produtos.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-24 text-muted">
          <PackageSearch size={48} className="opacity-40" />
          <p className="font-display font-semibold uppercase tracking-wider text-sm">
            Nenhum produto encontrado
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {produtos.map((p) => (
            <ProdutoCard
              key={p.id}
              produto={p}
              highlight={showHighlight ? query.trim() : undefined}
            />
          ))}
        </div>
      )}
    </div>
  )
}
