"use client"

import { useEffect } from "react"
import { AlertTriangle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  const isSupabaseError =
    error.message?.toLowerCase().includes("supabase") ||
    error.message?.toLowerCase().includes("fetch") ||
    error.message?.toLowerCase().includes("network")

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 p-6 text-center">
      <div className="flex items-center justify-center w-16 h-16 bg-danger/10 border border-danger/30 rounded-full">
        <AlertTriangle size={32} className="text-danger" />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-display font-bold text-xl uppercase tracking-wider text-white">
          {isSupabaseError ? "Erro de conexão" : "Algo deu errado"}
        </h2>
        <p className="text-muted text-sm max-w-sm">
          {isSupabaseError
            ? "Não foi possível conectar ao banco de dados. Verifique sua conexão e tente novamente."
            : "Ocorreu um erro inesperado. Tente novamente ou entre em contato com o suporte."}
        </p>
      </div>
      <button
        onClick={reset}
        className="inline-flex items-center justify-center px-6 py-3 bg-primary text-dark font-display font-bold text-sm uppercase tracking-wider rounded-md hover:bg-primary-hover transition-colors"
      >
        Tentar novamente
      </button>
    </div>
  )
}
