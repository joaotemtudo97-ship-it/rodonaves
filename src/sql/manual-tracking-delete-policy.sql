-- IMPORTANTE: esta política libera exclusão para o papel anon.
-- Só use no modelo de demonstração atual. Como o login admin é validado no
-- navegador (admin/admin), ele NÃO protege a API do Supabase contra chamadas diretas.
-- Para dados reais, migre o painel para Supabase Auth e use políticas TO authenticated.

DROP POLICY IF EXISTS "Allow anonymous delete access to packages" ON public.packages;
CREATE POLICY "Allow anonymous delete access to packages"
ON public.packages
FOR DELETE
TO anon
USING (true);

-- Necessária apenas para bancos antigos sem ON DELETE CASCADE, caso o código
-- precise remover manualmente as movimentações associadas antes de tentar novamente.
DROP POLICY IF EXISTS "Allow anonymous delete access to package_updates" ON public.package_updates;
CREATE POLICY "Allow anonymous delete access to package_updates"
ON public.package_updates
FOR DELETE
TO anon
USING (true);
