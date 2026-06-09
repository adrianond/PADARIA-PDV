import { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react"

export function Table({ className = "", children, ...props }: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto">
      <table className={`w-full text-sm ${className}`} {...props}>
        {children}
      </table>
    </div>
  )
}

export function TableHead({ className = "", children, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={`border-b border-border ${className}`} {...props}>
      {children}
    </thead>
  )
}

export function TableBody({ className = "", children, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={className} {...props}>{children}</tbody>
}

export function TableRow({ className = "", children, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={`border-b border-border even:bg-white/[0.02] hover:bg-white/[0.04] transition-colors ${className}`}
      {...props}
    >
      {children}
    </tr>
  )
}

export function TableTh({ className = "", children, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={`px-4 py-3 text-left text-xs font-display font-semibold uppercase tracking-wider text-muted ${className}`}
      {...props}
    >
      {children}
    </th>
  )
}

export function TableTd({ className = "", children, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={`px-4 py-3 text-white ${className}`} {...props}>
      {children}
    </td>
  )
}
