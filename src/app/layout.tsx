import type { Metadata } from "next"
import "./globals.css"
import { Sidebar } from "@/components/Sidebar"
import { ToastProvider } from "@/components/ui/Toast"

export const metadata: Metadata = {
  title: "Padaria PDV",
  description: "Sistema de ponto de venda para padaria",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="min-h-full bg-dark text-white antialiased flex">
        <ToastProvider>
          <Sidebar />
          <main className="flex-1 flex flex-col min-h-screen overflow-auto pb-16 md:pb-0">
            {children}
          </main>
        </ToastProvider>
      </body>
    </html>
  )
}
