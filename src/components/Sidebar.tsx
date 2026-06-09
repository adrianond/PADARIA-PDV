"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CreditCard, Package, Search, CroissantIcon } from "lucide-react"

const navItems = [
  { href: "/pagamento", label: "Pagamento", icon: CreditCard },
  { href: "/produtos", label: "Produtos", icon: Package },
  { href: "/consulta", label: "Consulta", icon: Search },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 min-h-screen bg-surface border-r border-border shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-6 border-b border-border">
          <div className="flex items-center justify-center w-9 h-9 bg-primary rounded-md">
            <CroissantIcon size={20} className="text-dark" />
          </div>
          <span className="font-display font-bold text-lg text-primary tracking-wide uppercase leading-none">
            Padaria PDV
          </span>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1 p-3 flex-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md font-display font-semibold text-sm uppercase tracking-wider transition-colors ${
                  active
                    ? "bg-primary text-dark"
                    : "text-muted hover:text-white hover:bg-border"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex bg-surface border-t border-border">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-1 flex-col items-center gap-1 py-3 text-xs font-display font-semibold uppercase tracking-wider transition-colors ${
                active ? "text-primary" : "text-muted"
              }`}
            >
              <Icon size={20} />
              {label}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
