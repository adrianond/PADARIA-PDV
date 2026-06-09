interface BadgeProps {
  active: boolean
  className?: string
}

export function Badge({ active, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-display font-semibold uppercase tracking-wide ${
        active
          ? "bg-success/20 text-success"
          : "bg-danger/20 text-danger"
      } ${className}`}
    >
      {active ? "Ativo" : "Inativo"}
    </span>
  )
}
