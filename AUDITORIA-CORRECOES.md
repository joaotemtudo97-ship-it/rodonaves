# Auditoria e correção pontual — Rodonaves Tracking

## Correção implementada
- O botão Excluir agora mostra estado de carregamento, pede confirmação explícita e verifica se o Supabase realmente retornou a linha excluída.
- Quando o banco bloqueia a operação por RLS ou por permissões, o painel mostra uma mensagem mais útil em vez de aparentar que nada aconteceu.
- O código tenta lidar com bancos antigos em que a relação `package_updates` não está configurada com `ON DELETE CASCADE`.
- Ao confirmar a exclusão, a encomenda é removida da lista local imediatamente; se a exclusão falhar, a lista é preservada.
- Foi adicionado `src/sql/manual-tracking-delete-policy.sql` para a configuração de permissões de exclusão.
- As mudanças de edição manual do rastreamento que já estavam no ZIP anterior foram mantidas.

## Como ativar a exclusão
1. Faça backup dos dados do Supabase.
2. Abra o SQL Editor do projeto Supabase usado pelo site.
3. Leia o aviso de segurança no início de `src/sql/manual-tracking-delete-policy.sql` antes de executar.
4. Execute o script e publique o projeto atualizado.
5. Teste com um código de teste e confirme que ele desaparece do painel e deixa de ser encontrado no rastreamento.

## Achados importantes da auditoria

### Alto risco — login administrativo no navegador
O painel compara usuário e senha fixos (`admin` / `admin`) no código do frontend. Isso não é autenticação segura: os valores podem ser descobertos e o bloqueio do navegador pode ser contornado. Não alterei esse fluxo para evitar bloquear seu acesso atual, mas recomendo migrar para Supabase Auth antes de armazenar dados sensíveis.

### Alto risco — políticas abertas do Supabase
O `setup.sql` concede leitura e inserção ao papel `anon`; a alteração anterior também concede atualização anônima. O script de exclusão acrescenta exclusão anônima para funcionar com a arquitetura atual, mas isso significa que alguém com acesso à API pública pode alterar ou apagar registros sem passar pela tela de login. **Use essa configuração apenas para demonstração/testes.** Para produção, a solução correta é autenticação real e políticas RLS para `authenticated`, não `anon`.

### Persistência parcial no cadastro
O cadastro grava primeiro a encomenda em `packages` e depois as etapas em `package_updates`, em duas operações separadas. Se a segunda operação falhar, pode ficar uma encomenda sem histórico. Não alterei esse fluxo nesta correção para não ampliar o escopo.

### Geração de códigos
O código é aleatório e a coluna é única. Em uma colisão rara, o banco rejeitará o cadastro; o painel mostrará o erro, mas não tenta gerar outro código automaticamente.

### Rastreamento simulado
As etapas são criadas com datas futuras e a interface as classifica comparando essas datas com o relógio atual. Não encontrei, nos arquivos analisados, um agendador real que execute uma tarefa a cada 25 horas; a simulação parece depender das datas já cadastradas. Não alterei esse comportamento.

## Verificação
- Revisão estática dos arquivos React, integração Supabase, configuração Vite e scripts SQL.
- Não foi possível concluir `npm run build`: as dependências não estavam instaladas e a instalação de pacotes expirou neste ambiente (`vite: not found`). Portanto, a compilação final ainda precisa ser confirmada no ambiente do projeto, após instalar as dependências.
