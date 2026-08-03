import React from 'react';
import { ArrowLeft, Package, Clock, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ParaVoce() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12 flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex flex-col cursor-pointer" onClick={() => navigate('/')}>
            <h1 className="text-3xl font-black tracking-tighter italic leading-none text-[#004a99]">
              RODONAVES<span className="text-[#ffcc00]">.</span>
            </h1>
          </div>
          <button onClick={() => navigate('/')} className="text-[#004a99] font-bold text-sm flex items-center gap-2 uppercase tracking-wider hover:text-[#003a7a] transition-colors">
            <ArrowLeft className="w-4 h-4"/> Voltar
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-4 py-16 w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-[#004a99] uppercase tracking-tight mb-6">Para Você</h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
            Soluções completas e seguras para o envio de suas encomendas pessoais, com a mesma qualidade e agilidade que entregamos para grandes empresas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Package className="w-8 h-8 text-[#004a99]" />
            </div>
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-wide mb-4">Envio Descomplicado</h3>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              Vá até uma de nossas unidades e despache sua encomenda de forma rápida, sem burocracia e com atendimento personalizado.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-[#004a99]" />
            </div>
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-wide mb-4">Agilidade Garantida</h3>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              Prazos de entrega otimizados com nossas rotas diárias e centros de distribuição estratégicos em todo o país.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-8 h-8 text-[#004a99]" />
            </div>
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-wide mb-4">Segurança Total</h3>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              Suas encomendas viajam com seguro e rastreamento em tempo real para sua total tranquilidade.
            </p>
          </div>
        </div>
      </main>
      
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs font-medium">
          © {new Date().getFullYear()} Rodonaves Transportes e Encomendas Ltda. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
