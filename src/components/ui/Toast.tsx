"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"
import { CheckCircle, XCircle, X } from "lucide-react"

type ToastType = "success" | "error"

interface ToastItem {
  id: number
  type: ToastType
  message: string
}

interface ToastContextValue {
  toast: (type: ToastType, message: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  let counter = 0

  const toast = useCallback((type: ToastType, message: string) => {
    const id = ++counter
    setToasts((prev) => [...prev, { id, type, message }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  const remove = (id: number) =>
    setToasts((prev) => prev.filter((t) => t.id !== id))

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col gap-2 w-80">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex items-start gap-3 px-4 py-3 rounded-md border shadow-lg text-sm text-white animate-in slide-in-from-right-4 fade-in ${
              t.type === "success"
                ? "bg-success/10 border-success/30"
                : "bg-danger/10 border-danger/30"
            }`}
          >
            {t.type === "success" ? (
              <CheckCircle size={18} className="text-success shrink-0 mt-0.5" />
            ) : (
              <XCircle size={18} className="text-danger shrink-0 mt-0.5" />
            )}
            <span className="flex-1">{t.message}</span>
            <button
              onClick={() => remove(t.id)}
              aria-label="Fechar notificação"
              className="text-muted hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used inside ToastProvider")
  return ctx.toast
}
