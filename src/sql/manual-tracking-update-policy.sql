-- Execute no SQL Editor do Supabase para permitir salvar as edições manuais
-- feitas pelo painel administrativo na tabela de movimentações.
-- Observação: esta política mantém o modelo de acesso público já usado por este projeto demo.
DROP POLICY IF EXISTS "Allow anonymous update access to package_updates" ON public.package_updates;

CREATE POLICY "Allow anonymous update access to package_updates"
ON public.package_updates
FOR UPDATE
TO anon
USING (true)
WITH CHECK (true);
