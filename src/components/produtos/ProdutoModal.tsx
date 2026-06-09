"use client"

import { useState, useEffect, useRef, ChangeEvent } from "react"
import { Modal } from "@/components/ui/Modal"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { createProduto, updateProduto } from "@/lib/produtos"
import { useToast } from "@/components/ui/Toast"
import type { Produto, ProdutoInsert } from "@/types/produto"

interface ProdutoModalProps {
  open: boolean
  onClose: () => void
  onSaved: () => void
  produto?: Produto | null
}

interface FormState {
  codigo: string
  descricao: string
  valorRaw: string   // centavos como string de dígitos
}

interface Errors {
  codigo?: string
  descricao?: string
  valor?: string
}

function digitsOnly(v: string) {
  return v.replace(/\D/g, "")
}

function formatCurrency(digits: string): string {
  if (!digits) return ""
  const cents = parseInt(digits.padStart(3, "0"), 10)
  return (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

function parseCents(digits: string): number {
  return parseInt(digits.padStart(3, "0"), 10)
}

export function ProdutoModal({ open, onClose, onSaved, produto }: ProdutoModalProps) {
  const toast = useToast()
  const codigoRef = useRef<HTMLInputElement>(null)
  const isEdit = !!produto

  const emptyForm: FormState = { codigo: "", descricao: "", valorRaw: "" }

  const [form, setForm] = useState<FormState>(emptyForm)
  const [errors, setErrors] = useState<Errors>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open) {
      if (produto) {
        const cents = Math.round(produto.valor * 100).toString()
        setForm({ codigo: produto.codigo, descricao: produto.descricao, valorRaw: cents })
      } else {
        setForm(emptyForm)
      }
      setErrors({})
      setTimeout(() => codigoRef.current?.focus(), 50)
    }
  }, [open, produto])

  function handleCodigoChange(e: ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 20)
    setForm((f) => ({ ...f, codigo: val }))
    if (errors.codigo) setErrors((e) => ({ ...e, codigo: undefined }))
  }

  function handleDescricaoChange(e: ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, descricao: e.target.value.slice(0, 255) }))
    if (errors.descricao) setErrors((e) => ({ ...e, descricao: undefined }))
  }

  function handleValorChange(e: ChangeEvent<HTMLInputElement>) {
    const digits = digitsOnly(e.target.value).slice(0, 7) // max 99999,99
    setForm((f) => ({ ...f, valorRaw: digits }))
    if (errors.valor) setErrors((e) => ({ ...e, valor: undefined }))
  }

  function validate(): boolean {
    const errs: Errors = {}
    if (!form.codigo) errs.codigo = "Código é obrigatório"
    if (!form.descricao || form.descricao.length < 3) errs.descricao = "Descrição deve ter no mínimo 3 caracteres"
    const cents = parseCents(form.valorRaw)
    if (!form.valorRaw || cents === 0) errs.valor = "Valor é obrigatório"
    else if (cents > 999999) errs.valor = "Valor máximo é R$ 9.999,99"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit() {
    if (!validate()) return
    setLoading(true)
    try {
      const data: ProdutoInsert = {
        codigo: form.codigo,
        descricao: form.descricao,
        valor: parseCents(form.valorRaw) / 100,
        ativo: true,
      }
      if (isEdit && produto) {
        await updateProduto(produto.id, data)
        toast("success", "Produto atualizado com sucesso")
      } else {
        await createProduto(data)
        toast("success", "Produto criado com sucesso")
      }
      onSaved()
      onClose()
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message ?? ""
      if (msg.includes("duplicate") || msg.includes("unique") || msg.includes("produtos_codigo_key")) {
        setErrors({ codigo: "Código já cadastrado" })
      } else {
        toast("error", "Erro ao salvar produto")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? "Editar Produto" : "Novo Produto"}>
      <div className="flex flex-col gap-4">
        <Input
          ref={codigoRef}
          label="Código"
          value={form.codigo}
          onChange={handleCodigoChange}
          error={errors.codigo}
          placeholder="Ex: PAO001"
          maxLength={20}
        />
        <Input
          label="Descrição"
          value={form.descricao}
          onChange={handleDescricaoChange}
          error={errors.descricao}
          placeholder="Ex: Pão francês"
          maxLength={255}
        />
        <Input
          label="Valor Unitário"
          value={formatCurrency(form.valorRaw)}
          onChange={handleValorChange}
          error={errors.valor}
          placeholder="R$ 0,00"
          inputMode="numeric"
        />
        <div className="flex gap-3 pt-2">
          <Button variant="ghost" onClick={onClose} className="flex-1" disabled={loading}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit} loading={loading} className="flex-1">
            Salvar
          </Button>
        </div>
      </div>
    </Modal>
  )
}
