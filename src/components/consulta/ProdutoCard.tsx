import { ReactNode } from "react"
import type { Produto } from "@/types/produto"

interface ProdutoCardProps {
  produto: Produto
  highlight?: string
}

function formatBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function Highlight({ text, term }: { text: string; term?: string }): ReactNode {
  if (!term) return text
  const parts = text.split(new RegExp(`(${escapeRegex(term)})`, "gi"))
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === term.toLowerCase() ? (
          <mark key={i} className="bg-primary text-dark rounded-sm px-0.5">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  )
}

export function ProdutoCard({ produto, highlight }: ProdutoCardProps) {
  return (
    <div className="bg-surface border border-border rounded-lg p-4 flex flex-col gap-3 hover:border-primary/40 transition-colors">
      <span className="inline-flex self-start items-center px-2.5 py-1 rounded bg-primary text-dark font-display font-bold text-xs uppercase tracking-widest">
        {produto.codigo}
      </span>
      <p className="text-white text-sm leading-snug flex-1">
        <Highlight text={produto.descricao} term={highlight} />
      </p>
      <p className="font-display font-bold text-primary" style={{ fontSize: "1.75rem", lineHeight: 1 }}>
        {formatBRL(produto.valor)}
      </p>
    </div>
  )
}
