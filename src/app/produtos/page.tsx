"use client"

import { useEffect, useState, useCallback } from "react"
import { Pencil, Trash2, Plus, PackageOpen } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import {
  Table, TableHead, TableBody, TableRow, TableTh, TableTd,
} from "@/components/ui/Table"
import { ProdutoModal } from "@/components/produtos/ProdutoModal"
import { DeleteConfirmModal } from "@/components/produtos/DeleteConfirmModal"
import { getProdutos } from "@/lib/produtos"
import type { Produto } from "@/types/produto"

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

function TableSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <TableRow key={i}>
          {Array.from({ length: 5 }).map((_, j) => (
            <TableTd key={j}>
              <div className="h-4 bg-border rounded animate-pulse w-24" />
            </TableTd>
          ))}
        </TableRow>
      ))}
    </>
  )
}

function EmptyState({ onNew }: { onNew: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-muted">
      <PackageOpen size={48} className="opacity-40" />
      <p className="font-display font-semibold uppercase tracking-wider text-sm">
        Nenhum produto cadastrado
      </p>
      <Button variant="primary" onClick={onNew}>
        <Plus size={16} /> Novo Produto
      </Button>
    </div>
  )
}

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selected, setSelected] = useState<Produto | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getProdutos()
      setProdutos(data)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  function handleEdit(produto: Produto) {
    setSelected(produto)
    setModalOpen(true)
  }

  function handleDeleteClick(produto: Produto) {
    setSelected(produto)
    setDeleteOpen(true)
  }

  function handleNew() {
    setSelected(null)
    setModalOpen(true)
  }

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-display font-bold text-2xl uppercase tracking-wider text-white">
          Produtos
        </h1>
        <Button variant="primary" onClick={handleNew}>
          <Plus size={16} /> Novo Produto
        </Button>
      </div>

      {/* Table */}
      {!loading && produtos.length === 0 ? (
        <EmptyState onNew={handleNew} />
      ) : (
        <div className="bg-surface border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHead>
              <TableRow className="border-0">
                <TableTh>Código</TableTh>
                <TableTh>Descrição</TableTh>
                <TableTh>Valor Unitário</TableTh>
                <TableTh>Status</TableTh>
                <TableTh className="text-right">Ações</TableTh>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableSkeleton />
              ) : (
                produtos.map((p) => (
                  <TableRow key={p.id}>
                    <TableTd className="font-display font-semibold tracking-wider text-primary">
                      {p.codigo}
                    </TableTd>
                    <TableTd>{p.descricao}</TableTd>
                    <TableTd className="font-display font-semibold">
                      {formatBRL(p.valor)}
                    </TableTd>
                    <TableTd>
                      <Badge active={p.ativo} />
                    </TableTd>
                    <TableTd className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(p)}
                          aria-label={`Editar ${p.descricao}`}
                          className="p-1.5 text-muted hover:text-white transition-colors rounded"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(p)}
                          aria-label={`Excluir ${p.descricao}`}
                          className="p-1.5 text-muted hover:text-danger transition-colors rounded"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </TableTd>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <ProdutoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={load}
        produto={selected}
      />
      <DeleteConfirmModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onDeleted={load}
        produto={selected}
      />
    </div>
  )
}
