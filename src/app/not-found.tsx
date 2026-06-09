import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6 text-center">
      <p className="font-display font-bold text-primary" style={{ fontSize: "8rem", lineHeight: 1 }}>
        404
      </p>
      <h1 className="font-display font-bold text-2xl uppercase tracking-wider text-white">
        Página não encontrada
      </h1>
      <p className="text-muted text-sm max-w-xs">
        O endereço que você tentou acessar não existe ou foi removido.
      </p>
      <Link
        href="/pagamento"
        className="inline-flex items-center justify-center px-6 py-3 bg-primary text-dark font-display font-bold text-sm uppercase tracking-wider rounded-md hover:bg-primary-hover transition-colors"
      >
        Voltar ao PDV
      </Link>
    </div>
  )
}
