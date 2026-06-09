import { supabase } from './supabase'
import type { Produto, ProdutoInsert, ProdutoUpdate } from '@/types/produto'

export async function getProdutos(): Promise<Produto[]> {
  const { data, error } = await supabase
    .from('produtos')
    .select('*')
    .eq('ativo', true)
    .order('descricao')

  if (error) throw error
  return data
}

export async function getProdutoByCodigo(codigo: string): Promise<Produto | null> {
  const { data, error } = await supabase
    .from('produtos')
    .select('*')
    .eq('codigo', codigo.toUpperCase())
    .eq('ativo', true)
    .single()

  if (error?.code === 'PGRST116') return null
  if (error) throw error
  return data
}

export async function searchProdutos(query: string): Promise<Produto[]> {
  const { data, error } = await supabase
    .from('produtos')
    .select('*')
    .eq('ativo', true)
    .or(`codigo.ilike.%${query}%,descricao.ilike.%${query}%`)
    .order('descricao')
    .limit(50)

  if (error) throw error
  return data
}

export async function createProduto(data: ProdutoInsert): Promise<Produto> {
  const { data: produto, error } = await supabase
    .from('produtos')
    .insert({ ...data, codigo: data.codigo.toUpperCase() })
    .select()
    .single()

  if (error) throw error
  return produto
}

export async function updateProduto(id: string, data: ProdutoUpdate): Promise<Produto> {
  const payload = data.codigo
    ? { ...data, codigo: data.codigo.toUpperCase() }
    : data

  const { data: produto, error } = await supabase
    .from('produtos')
    .update(payload)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return produto
}

export async function deleteProduto(id: string): Promise<void> {
  const { error } = await supabase
    .from('produtos')
    .update({ ativo: false })
    .eq('id', id)

  if (error) throw error
}
