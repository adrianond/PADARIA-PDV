import { HTMLAttributes } from "react"

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({ className = "", children, ...props }: CardProps) {
  return (
    <div
      className={`bg-surface border border-border rounded-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
