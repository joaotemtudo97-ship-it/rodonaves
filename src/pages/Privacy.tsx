import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Privacy() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12 flex flex-col">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex flex-col cursor-pointer" onClick={() => navigate('/')}>
            <h1 className="text-3xl font-black tracking-tighter italic leading-none text-[#004a99]">
              RODONAVES<span className="text-[#ffcc00]">.</span>
            </h1>
          </div>
          <button onClick={() => navigate('/')} className="text-[#004a99] font-bold text-sm flex items-center gap-2 uppercase tracking-wider hover:text-[#003a7a] transition-colors">
            <ArrowLeft className="w-4 h-4"/> Voltar para Home
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200">
          <h1 className="text-2xl md:text-3xl font-black text-[#004a99] uppercase tracking-tight mb-8">Política de Privacidade</h1>
          
          <div className="space-y-6 text-slate-600 font-medium">
            <p>A privacidade e a segurança dos dados de nossos clientes são prioridades para a Rodonaves. Esta política descreve como tratamos as informações relacionadas ao rastreamento de cargas.</p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Coleta de Dados</h2>
            <p>No módulo de rastreamento, processamos apenas os dados essenciais para localizar a encomenda: código de rastreio, nome do remetente, cidade de origem, nome do destinatário e cidade de destino. Não exibimos endereços completos no rastreamento público para garantir a segurança da carga.</p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. Uso das Informações</h2>
            <p>As informações logísticas são utilizadas exclusivamente para prestação do serviço de transporte e para manter o cliente informado sobre o status da entrega.</p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. Proteção e Segurança</h2>
            <p>Utilizamos sistemas robustos de criptografia e controles de acesso para garantir que os dados das suas encomendas não sejam alterados ou interceptados por terceiros.</p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">4. LGPD</h2>
            <p>Em conformidade com a Lei Geral de Proteção de Dados (LGPD), você tem o direito de solicitar esclarecimentos sobre o tratamento dos seus dados entrando em contato pelo e-mail atendimento@rodonaves.com.br.</p>
          </div>
        </div>
      </main>
      
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 mt-auto z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-medium">© {new Date().getFullYear()} Rodonaves Transportes e Encomendas Ltda. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
