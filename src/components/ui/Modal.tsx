"use client"

import { useEffect, ReactNode } from "react"
import { X } from "lucide-react"

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  className?: string
}

export function Modal({ open, onClose, title, children, className = "" }: ModalProps) {
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />

      {/* Content */}
      <div
        className={`relative z-10 w-full max-w-md bg-surface border border-border rounded-lg shadow-xl ${className}`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2
            id="modal-title"
            className="text-base font-display font-bold uppercase tracking-wider text-white"
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Fechar modal"
            className="text-muted hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  )
}
