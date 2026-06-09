export interface Produto {
  id: string
  codigo: string
  descricao: string
  valor: number
  ativo: boolean
  created_at: string
  updated_at: string
}

export type ProdutoInsert = Omit<Produto, 'id' | 'created_at' | 'updated_at'>
export type ProdutoUpdate = Partial<ProdutoInsert>

export interface CartItem {
  produto: Produto
  quantidade: number
}
