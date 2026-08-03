import React from 'react';
import { ArrowLeft, TrendingUp, Handshake, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ParaEmpresa() {
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
          <h1 className="text-4xl md:text-5xl font-black text-[#004a99] uppercase tracking-tight mb-6">Para sua Empresa</h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
            Logística inteligente, redução de custos e integração total para impulsionar o crescimento do seu negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#004a99] rounded-xl flex items-center justify-center mb-6">
              <TrendingUp className="w-6 h-6 text-[#ffcc00]" />
            </div>
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-wide mb-3">Alta Performance</h3>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              Otimize sua cadeia de suprimentos com coletas programadas, entregas dedicadas e SLAs rigorosos para B2B e B2C.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#004a99] rounded-xl flex items-center justify-center mb-6">
              <BarChart3 className="w-6 h-6 text-[#ffcc00]" />
            </div>
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-wide mb-3">Gestão de Dados</h3>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              Dashboard exclusivo com relatórios de performance, KPIs logísticos e integração via API com seu ERP ou e-commerce.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#004a99] rounded-xl flex items-center justify-center mb-6">
              <Handshake className="w-6 h-6 text-[#ffcc00]" />
            </div>
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-wide mb-3">Parceria Estratégica</h3>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              Atendimento executivo dedicado, soluções customizadas para sua indústria e flexibilidade comercial para grandes volumes.
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
