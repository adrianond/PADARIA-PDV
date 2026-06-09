"use client"

import { useState } from "react"
import { Modal } from "@/components/ui/Modal"
import { Button } from "@/components/ui/Button"
import { deleteProduto } from "@/lib/produtos"
import { useToast } from "@/components/ui/Toast"
import type { Produto } from "@/types/produto"

interface DeleteConfirmModalProps {
  open: boolean
  onClose: () => void
  onDeleted: () => void
  produto: Produto | null
}

export function DeleteConfirmModal({ open, onClose, onDeleted, produto }: DeleteConfirmModalProps) {
  const toast = useToast()
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!produto) return
    setLoading(true)
    try {
      await deleteProduto(produto.id)
      toast("success", "Produto excluído com sucesso")
      onDeleted()
      onClose()
    } catch {
      toast("error", "Erro ao excluir produto")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Excluir Produto">
      <div className="flex flex-col gap-6">
        <p className="text-sm text-muted">
          Tem certeza que deseja excluir o produto{" "}
          <span className="text-white font-semibold">{produto?.descricao}</span>?
          <br />
          Esta ação não pode ser desfeita.
        </p>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={onClose} className="flex-1" disabled={loading}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete} loading={loading} className="flex-1">
            Excluir
          </Button>
        </div>
      </div>
    </Modal>
  )
}
