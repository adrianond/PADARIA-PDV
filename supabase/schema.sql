-- Tabela de produtos
CREATE TABLE IF NOT EXISTS produtos (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo     VARCHAR(20) NOT NULL UNIQUE,
  descricao  VARCHAR(255) NOT NULL,
  valor      NUMERIC(10, 2) NOT NULL CHECK (valor > 0),
  ativo      BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes para busca rápida
CREATE INDEX IF NOT EXISTS idx_produtos_codigo ON produtos(codigo);
CREATE INDEX IF NOT EXISTS idx_produtos_descricao ON produtos USING gin(to_tsvector('portuguese', descricao));

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_produtos_updated_at
BEFORE UPDATE ON produtos
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row Level Security
ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "leitura_publica" ON produtos
FOR SELECT USING (true);

CREATE POLICY "escrita_publica" ON produtos
FOR ALL USING (true);
