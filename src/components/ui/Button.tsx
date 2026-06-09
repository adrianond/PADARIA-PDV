import { ButtonHTMLAttributes, forwardRef } from "react"

type Variant = "primary" | "ghost" | "danger"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  loading?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-dark hover:bg-primary-hover font-display font-bold uppercase tracking-wider",
  ghost:
    "bg-transparent text-white border border-border hover:bg-border font-display font-semibold uppercase tracking-wider",
  danger:
    "bg-danger text-white hover:bg-red-600 font-display font-bold uppercase tracking-wider",
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", loading = false, disabled, className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm
          transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variantClasses[variant]}
          ${className}
        `}
        {...props}
      >
        {loading && (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"
