import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Terms() {
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
          <h1 className="text-2xl md:text-3xl font-black text-[#004a99] uppercase tracking-tight mb-8">Termos de Uso</h1>
          
          <div className="space-y-6 text-slate-600 font-medium">
            <p>Bem-vindo ao sistema de rastreamento Rodonaves. Ao acessar e utilizar este sistema, você concorda com os presentes Termos de Uso.</p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Uso do Sistema</h2>
            <p>O sistema de rastreamento é disponibilizado exclusivamente para acompanhamento de cargas transportadas pela Rodonaves e suas parceiras. É vedado o uso automatizado (bots) para extração de dados sem autorização prévia.</p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. Precisão das Informações</h2>
            <p>As atualizações de status são realizadas a cada etapa do processo logístico (bipes nas unidades de transferência). Eventuais atrasos na sincronização podem ocorrer devido a áreas de sombra de cobertura de dados móveis.</p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. Propriedade Intelectual</h2>
            <p>Todo o conteúdo, design e arquitetura deste sistema pertencem à Rodonaves. A reprodução não autorizada é proibida.</p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">4. Contato</h2>
            <p>Em caso de dúvidas sobre suas encomendas ou estes termos, utilize nossa central de atendimento no número 0800 134 3333.</p>
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
